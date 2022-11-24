import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  orderObject,
  desiredOrder,
  desiredCalcOrderDetails,
} from '../constants';
import { IOrderInput, MockType } from '../types';
import { OrdersService } from './orders.service';
import { CalcOrderInput, Order } from './entities/order.entity';
import { calcOrderPrice, calcTotalMealsQuantity } from '../utils';

describe('OrdersService', () => {
  let service: OrdersService;
  const orderRepositoryMock: MockType<Repository<Order>> = {
    create: jest.fn(),
    save: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: orderRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<OrdersService>(OrdersService);
  });
  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Create order', () => {
    it('should create a new order', async () => {
      orderRepositoryMock.save.mockReturnValue(orderObject);
      const { lineItems, coupons } = orderObject;
      const totalMeals = calcTotalMealsQuantity(lineItems);
      const totalPrice = calcOrderPrice(coupons, lineItems);
      const createOrderObject: IOrderInput = {
        ...orderObject,
        totalPrice,
        lineItems: totalMeals,
      };
      const newRestarunt = await service.create(createOrderObject);
      expect(newRestarunt).toMatchObject(desiredOrder);
    });
  });
  describe('Calcultae order totals', () => {
    it('should Calcultae order totals', async () => {
      const orderInput: CalcOrderInput = {
        lineItems: [
          { mealName: 'Sushi', price: 70 },
          { mealName: 'Fish', price: 80 },
          { mealName: 'Fish', price: 80 },
          { mealName: 'Fries', price: 30 },
        ],
        coupons: [10, 20, 30],
      };
      const order = service.calcOrderTotals(orderInput);
      expect(order).toMatchObject(desiredCalcOrderDetails);
    });
  });
});

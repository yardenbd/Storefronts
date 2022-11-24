import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  orderObject,
  desiredOrder,
  desiredCalcOrderDetails,
} from '../constants';
import { MockType } from '../types';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  const orderRepositoryMock: MockType<Repository<Order>> = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
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
      const newRestarunt = await service.create(orderObject);
      expect(newRestarunt).toMatchObject(desiredOrder);
    });
  });
  describe('Calcultae order totals', () => {
    it('should Calcultae order totals', async () => {
      orderRepositoryMock.findOne.mockReturnValue(orderObject);
      const order = await service.calcOrderTotals(orderObject.orderId);
      expect(order).toMatchObject(desiredCalcOrderDetails);
    });
  });
});

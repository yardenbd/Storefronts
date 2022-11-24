import { Test, TestingModule } from '@nestjs/testing';
import {
  desiredCalcOrderDetails,
  desiredOrder,
  orderObject,
} from '../constants';
import { CalcOrderInput } from './entities/calcOrder.entity';
import { OrdersResolver } from './orders.resolver';
import { CreateOrderInput } from './dto/create-order.input';
import { OrdersService } from './orders.service';

describe('Storefront Resolver', () => {
  let resolver: OrdersResolver;
  const orderResolverMock = {
    create: jest.fn((order: CreateOrderInput) => orderObject),
    calcOrderTotals: jest.fn(
      (orderCalcInput: CalcOrderInput) => desiredCalcOrderDetails,
    ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersResolver,
        {
          provide: OrdersService,
          useValue: orderResolverMock,
        },
      ],
    }).compile();
    resolver = module.get<OrdersResolver>(OrdersResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('Create order', () => {
    it('should create a Stroefront', async () => {
      const order = await resolver.createOrder(orderObject);
      expect(order).toMatchObject(desiredOrder);
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
      const order = resolver.calcOrderTotals(orderInput);
      console.log('order', order);
      expect(order).toMatchObject(desiredCalcOrderDetails);
    });
  });
});

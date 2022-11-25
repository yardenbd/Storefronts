import { Test, TestingModule } from '@nestjs/testing';
import { desiredCalcDetails, desiredOrder, orderObject } from '../constants';
import { CalcOrderInput } from './entities/calcOrder.entity';
import { OrdersResolver } from './orders.resolver';
import { CreateOrderInput } from './dto/create-order.input';
import { OrdersService } from './orders.service';

describe('Storefront Resolver', () => {
  let resolver: OrdersResolver;
  const orderResolverMock = {
    create: jest.fn((order: CreateOrderInput) => orderObject),
    calcOrderTotals: jest.fn(
      (orderCalcInput: CalcOrderInput) => desiredCalcDetails,
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
      const order = resolver.calcOrderTotals(orderObject.orderId);
      console.log('order', order);
      expect(order).toMatchObject(desiredCalcDetails);
    });
  });
});

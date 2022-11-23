import { Test, TestingModule } from '@nestjs/testing';
import { desiredOrder, orderObject } from '../constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDbConfig } from '../config/db.config';
import { OrdersResolver } from './orders.resolver';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { OrdersService } from './orders.service';

describe('Restraunt Resolver', () => {
  let resolver: OrdersResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersResolver,
        {
          provide: OrdersService,
          useFactory: () => ({
            create: jest.fn((order: CreateOrderInput) => orderObject),
          }),
        },
      ],
      imports: [
        TypeOrmModule.forRootAsync(createDbConfig<Order>(Order)),
        TypeOrmModule.forFeature([Order]),
      ],
    }).compile();
    resolver = module.get<OrdersResolver>(OrdersResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('create', () => {
    it('should create a Stroefront', async () => {
      const order = await resolver.createOrder(orderObject);
      expect(order).toMatchObject(desiredOrder);
    });
  });
});

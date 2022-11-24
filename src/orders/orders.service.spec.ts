import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { orderObject, desiredOrder } from '../constants';
import { IOrderInput, MockType } from '../types';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { calcOrderPrice, calcTotalMealsQuantity } from '../utils';

describe('OrdersService', () => {
  let service: OrdersService;
  const orderRepositoryMock: MockType<Repository<Order>> = {
    create: jest.fn(),
    save: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [
      //   TypeOrmModule.forRootAsync({
      //     useFactory: () => ({
      //       type: 'postgres',
      //       host: 'localhost',
      //       name: 'yarden',
      //       port: 5432,
      //       username: 'postgres',
      //       password: 'Yb212081046',
      //       database: 'postgres',
      //       entities: [Storefront],
      //       synchronize: true,
      //       logging: false,
      //     }),
      //   }),
      //   TypeOrmModule.forFeature([Storefront]),
      // ],
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
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType } from '../types';
import { OrdersService } from './orders.service';
import { Orders } from './entities/order.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { desiredOrder, orderObject } from './constants';

describe('OrdersService', () => {
  let service: OrdersService;
  const orderRepositoryMock: MockType<Repository<Orders>> = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    query: jest.fn(),
  };
  const orderDetailRepositoryMock: MockType<Repository<Orders>> = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Orders),
          useValue: orderRepositoryMock,
        },
        {
          provide: getRepositoryToken(OrderDetail),
          useValue: orderDetailRepositoryMock,
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
      orderRepositoryMock.create.mockReturnValue(orderObject);
      const newOrder = await service.create(orderObject);
      expect(newOrder).toMatchObject(desiredOrder);
    });
  });
});

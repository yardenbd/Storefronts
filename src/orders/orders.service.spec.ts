import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { orderObject, desiredOrder, desiredCalcDetails } from '../constants';
import { MockType } from '../types';
import { OrdersService } from './orders.service';
import { Orders } from './entities/order.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  const orderRepositoryMock: MockType<Repository<Orders>> = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Orders),
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
      expect(order).toMatchObject(desiredCalcDetails);
    });
  });
});

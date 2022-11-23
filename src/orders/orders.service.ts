import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { IOrderInput } from 'src/types';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  create(newOrderArgs: IOrderInput): Promise<Order> {
    const newOrder = this.ordersRepository.create(newOrderArgs);
    return this.ordersRepository.save(newOrder);
  }
}

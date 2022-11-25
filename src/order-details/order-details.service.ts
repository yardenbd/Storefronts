import { Injectable } from '@nestjs/common';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';
import { UpdateOrderDetailInput } from './dto/update-order-detail.input';

@Injectable()
export class OrderDetailsService {
  create(createOrderDetailInput: CreateOrderDetailInput) {
    return 'This action adds a new orderDetail';
  }

  findAll() {
    return `This action returns all orderDetails`;
  }

  findOne(id: string) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: string, updateOrderDetailInput: UpdateOrderDetailInput) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: string) {
    return `This action removes a #${id} orderDetail`;
  }
}

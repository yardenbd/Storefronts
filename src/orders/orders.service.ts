import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CalcOrderInput } from './entities/calcOrder.entity';
import { Repository } from 'typeorm';
import { IOrderInput } from '../types';
import { calcOrderPrice, calcTotalMealsQuantity } from '../utils';
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

  calcOrderTotals(CalcOrdetInput: CalcOrderInput) {
    const { lineItems, coupons } = CalcOrdetInput;
    const totalMeals = calcTotalMealsQuantity(lineItems);
    const totalPrice = calcOrderPrice(coupons, lineItems);
    return { totalMeals, totalPrice };
  }
}

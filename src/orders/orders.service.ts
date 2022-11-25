import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { calcOrderPrice, calcTotalMealsQuantity } from '../utils';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderDetail } from '../order-details/entities/order-details.entity';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  create(newOrderArgs: CreateOrderInput): Promise<Order> {
    this.orderDetailRepository.save({});
    return this.ordersRepository.save(newOrderArgs);
  }

  async calcOrderTotals(orderId: string) {
    // const selectedOrder = await this.ordersRepository.findOne({
    //   where: { orderId },
    // });
    // const { orderDetail, coupons } = selectedOrder;
    // console.log('orderDetail', orderDetail);
    // console.log('coupons', coupons);
    // const totalMeals = calcTotalMealsQuantity(orderDetail);
    // const totalPrice = calcOrderPrice(coupons, orderDetail);
    // return { totalMeals, totalPrice };
  }
}

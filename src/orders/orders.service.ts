import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { Repository } from 'typeorm';
import {
  calcOrderPrice,
  calcTotalMealsQuantity,
  removeMealDuplication,
} from '../utils';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  async create(newOrderArgs: CreateOrderInput) {
    const orderId = uuidv4();
    const createdOrder = this.ordersRepository.create({
      id: orderId,
      ...newOrderArgs,
    });
    await this.ordersRepository.save(createdOrder);
    const { lineItems } = newOrderArgs;
    const quantity = calcTotalMealsQuantity(lineItems);
    const unduplicatedItems = removeMealDuplication(lineItems);
    unduplicatedItems.forEach(async (item) => {
      await this.orderDetailsRepository.save({
        orderId,
        quantity: quantity[item.mealName],
        menuItemId: item.id,
      });
    });
    return createdOrder;
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { Repository } from 'typeorm';
import {
  calcOrderPrice,
  calcTotalMealsQuantity,
  removeDuplications,
} from '../utils';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { v4 as uuidv4 } from 'uuid';
import { CalcOrder } from './entities/calcOrder.entity';
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
    const unduplicatedItems = removeDuplications(lineItems);
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
    const joinQuery = `SELECT coupons, quantity ,menu_item.id, price FROM orders 
    JOIN order_detail ON orders.id = order_detail."orderId"
    JOIN menu_item ON order_detail."menuItemId" = menu_item.id
    WHERE orders.id = $1`;
    const allOrderItems = (await this.ordersRepository.query(joinQuery, [
      orderId,
    ])) as CalcOrder[];
    const coupons = allOrderItems[0].coupons;
    const calculatedOrderTotals = calcOrderPrice(
      coupons,
      allOrderItems.map((item) => item.price),
    );
    console.log('allOrderItems', allOrderItems);
  }
}

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
    const orderTotalPrice = calcOrderPrice(
      newOrderArgs.coupons,
      newOrderArgs.lineItems,
    );
    const createdOrder = this.ordersRepository.create({
      id: orderId,
      totalPrice: orderTotalPrice,
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
    const joinQuery = `SELECT coupons, quantity , "mealName", price, "totalPrice"  FROM orders
    JOIN order_detail ON orders.id = order_detail."orderId"
    JOIN menu_item ON order_detail."menuItemId" = menu_item.id
    WHERE orders.id = $1`;
    const allOrderItems = (await this.ordersRepository.query(joinQuery, [
      orderId,
    ])) as CalcOrder[];
    console.log('allOrderItemss', allOrderItems);
    const menuItems = allOrderItems.map(({ mealName, price, quantity }) => ({
      mealName,
      price,
      quantity,
    }));
    const orderInformation = {
      coupons: allOrderItems[0].coupons,
      totalPrice: allOrderItems[0].totalPrice,
      menuItems,
    };
    return orderInformation;
  }
}

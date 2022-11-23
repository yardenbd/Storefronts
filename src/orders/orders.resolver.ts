import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { calcOrderPrice, calcTotalMealsQuantity } from '../utils';
import { IOrderInput } from '../types';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order, { name: 'createOrder' })
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    const { lineItems, coupons } = createOrderInput;
    const totalMeals = calcTotalMealsQuantity(lineItems);
    const totalPrice = calcOrderPrice(coupons, lineItems);
    const createOrderObject: IOrderInput = {
      ...createOrderInput,
      totalPrice,
      lineItems: totalMeals,
    };
    return this.ordersService.create(createOrderObject);
  }
}

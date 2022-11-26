import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Orders } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { calcOrderPrice, calcTotalMealsQuantity } from '../utils';
import { IOrderInput } from '../types';
import { CalcOrder, CalcOrderInput } from './entities/calcOrder.entity';

@Resolver(() => Orders)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => CalcOrder, {
    name: 'calcOrderTotals',
  })
  calcOrderTotals(
    @Args('orderId')
    orderId: string,
  ) {
    return this.ordersService.calcOrderTotals(orderId);
  }

  @Mutation(() => Orders, { name: 'createOrder' })
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }
}

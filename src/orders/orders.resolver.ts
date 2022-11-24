import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { calcOrderPrice, calcTotalMealsQuantity } from '../utils';
import { IOrderInput } from '../types';
import { CalcOrder, CalcOrderInput } from './entities/calcOrder.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => CalcOrder, {
    name: 'CalcOrder',
  })
  calcOrderTotals(
    @Args('createOrderInput')
    CalcOrdetInput: CalcOrderInput,
  ) {
    return this.ordersService.calcOrderTotals(CalcOrdetInput);
  }

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

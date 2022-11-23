import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { calcOrderPrice, calcTotalMealsQuantity } from 'src/utils';
import { IOrderInput } from 'src/types';

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
    console.log('createOrderObject', createOrderObject);
    return this.ordersService.create(createOrderObject);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.remove(id);
  }
}

import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateOrderInput } from './orders/dto/create-order.input';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

export interface ITotalOrder {
  mealName: string;
  quantity: number;
  price: number;
}

export interface IOrderInput {
  totalPrice: number;
  orderDetail: ITotalOrder[];
}

@InputType()
export class Pagination {
  @Field(() => Int)
  take: number;
  @Field(() => Int)
  skip: number;
}

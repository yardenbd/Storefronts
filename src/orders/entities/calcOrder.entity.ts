import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { OrderDetail, OrderDetailInput } from './orderDetail.entity';
@InputType()
export class CalcOrderInput {
  @Field(() => [OrderDetailInput])
  lineItems: OrderDetailInput[];
  @Field(() => [Number], { nullable: true })
  coupons?: number[];
}
@ObjectType()
export class CalcOrder {
  @Field(() => [OrderDetail])
  totalMeals: OrderDetail[];
  @Field(() => Number)
  totalPrice: number;
}

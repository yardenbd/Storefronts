import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { OrderDetailInput } from './orderDetail.entity';
@InputType()
export class CalcOrderInput {
  @Field(() => [OrderDetailInput])
  orderDetail: OrderDetailInput[];
  @Field(() => [Number], { nullable: true })
  coupons?: number[];
}
@ObjectType()
export class CalcOrder {
  totalMeals: any[];
  @Field(() => Number)
  totalPrice: number;
}

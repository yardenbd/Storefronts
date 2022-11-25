import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { DetailsInput } from './orderDetail.entity';
@InputType()
export class CalcOrderInput {
  @Field(() => [DetailsInput])
  orderDetail: DetailsInput[];
  @Field(() => [Number], { nullable: true })
  coupons?: number[];
}
@ObjectType()
export class CalcOrder {
  totalMeals: any[];
  @Field(() => Number)
  totalPrice: number;
}

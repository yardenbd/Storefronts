import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { LineItems, LineItemsInput } from './lineItems.entity';
@InputType()
export class CalcOrderInput {
  @Field(() => [LineItemsInput])
  lineItems: LineItemsInput[];
  @Field(() => [Number], { nullable: true })
  coupons?: number[];
}
@ObjectType()
export class CalcOrder {
  @Field(() => [LineItems])
  totalMeals: LineItems[];
  @Field(() => Number)
  totalPrice: number;
}

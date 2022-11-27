import { InputType, Field, Int } from '@nestjs/graphql';
import { OrderDetailsInput } from '../entities/orderDetail.entity';
import { Matches } from 'class-validator';

const capitalAndLowercaseRegex = /^[A-Za-z.\s_-]+$/;
@InputType()
export class CreateOrderInput {
  @Matches(capitalAndLowercaseRegex)
  @Field(() => String)
  customerName: string;

  @Matches(capitalAndLowercaseRegex)
  @Field(() => String)
  customerAddress: string;

  @Field(() => [OrderDetailsInput])
  lineItems: OrderDetailsInput[];

  @Field(() => [Int], { nullable: true })
  coupons?: number[];
}

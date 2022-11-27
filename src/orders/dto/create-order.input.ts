import { InputType, Field, Int } from '@nestjs/graphql';
import { OrderDetailsInput } from '../entities/orderDetail.entity';
import { Matches } from 'class-validator';

const CUSTOMER_NAME_REGEX = /^[A-Za-z.\s_-]+$/;
const ADDRESS_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
@InputType()
export class CreateOrderInput {
  @Matches(CUSTOMER_NAME_REGEX)
  @Field(() => String)
  customerName: string;

  @Matches(ADDRESS_REGEX)
  @Field(() => String)
  customerAddress: string;

  @Field(() => [OrderDetailsInput])
  lineItems: OrderDetailsInput[];

  @Field(() => [Int], { nullable: true })
  coupons?: number[];
}

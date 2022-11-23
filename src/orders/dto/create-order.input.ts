import { InputType, Int, Field } from '@nestjs/graphql';
import { LineItemsInput } from '../entities/order.entity';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  customerName: string;
  @Field(() => String)
  customerAddress: string;
  @Field(() => [LineItemsInput])
  lineItems: [LineItemsInput];
  @Field(() => [Number], { nullable: true })
  coupons?: [number];
}

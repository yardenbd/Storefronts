import { InputType, Field } from '@nestjs/graphql';
import { LineItemsInput } from '../entities/order.entity';
import { IsAlpha } from 'class-validator';
@InputType()
export class CreateOrderInput {
  @IsAlpha()
  @Field(() => String)
  customerName: string;
  @IsAlpha()
  @Field(() => String)
  customerAddress: string;
  @Field(() => [LineItemsInput])
  lineItems: LineItemsInput[];
  @Field(() => [Number], { nullable: true })
  coupons?: number[];
}

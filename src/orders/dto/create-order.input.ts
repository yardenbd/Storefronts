import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { LineItemsInput } from '../entities/lineItems.entity';
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

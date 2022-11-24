import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { OrderDetailInput } from '../entities/orderDetail.entity';
@InputType()
export class CreateOrderInput {
  @IsAlpha()
  @Field(() => String)
  customerName: string;
  @IsAlpha()
  @Field(() => String)
  customerAddress: string;
  @Field(() => [OrderDetailInput])
  lineItems: OrderDetailInput[];
  @Field(() => [Number], { nullable: true })
  coupons?: number[];
}

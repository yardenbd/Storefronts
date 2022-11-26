import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsUUID } from 'class-validator';
import { CouponInputType } from '../../copoun/entities/coupon.entity';
import { OrderDetailsInput } from '../entities/orderDetail.entity';
@InputType()
export class CreateOrderInput {
  @IsAlpha()
  @Field(() => String)
  customerName: string;
  @IsAlpha()
  @Field(() => String)
  customerAddress: string;
  @Field(() => [OrderDetailsInput])
  lineItems: OrderDetailsInput[];
  @Field(() => [Int], { nullable: true })
  coupons?: number[];
}

import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { CouponInputType } from 'src/copoun/entities/coupon.entity';
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
  orderDetail: OrderDetailInput[];
  @Field(() => [CouponInputType], { nullable: true })
  coupons?: CouponInputType[];
}

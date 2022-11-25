import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { CouponInputType } from 'src/copoun/entities/coupon.entity';
import { DetailsInput } from '../entities/orderDetail.entity';
@InputType()
export class CreateOrderInput {
  @IsAlpha()
  @Field(() => String)
  customerName: string;
  @IsAlpha()
  @Field(() => String)
  customerAddress: string;
  @Field(() => [DetailsInput])
  lineItems: DetailsInput[];

  @Field(() => [CouponInputType], { nullable: true })
  coupons?: CouponInputType[];
}

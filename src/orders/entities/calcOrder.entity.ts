import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Coupon } from 'src/copoun/entities/coupon.entity';
import { DetailsInput } from './orderDetail.entity';
@InputType()
export class CalcOrderInput {
  @Field(() => [DetailsInput])
  orderDetail: DetailsInput[];
  @Field(() => [Number], { nullable: true })
  coupons?: number[];
}
@ObjectType()
export class CalcOrder {
  @Field()
  id: string;
  @Field(() => Int)
  quantity: number;
  @Field(() => Int)
  price: number;
  @Field(() => Coupon)
  coupons: Pick<Coupon, 'discount'>[];
}

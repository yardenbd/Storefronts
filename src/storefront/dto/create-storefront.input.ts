import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
import { Coupon, CouponInputType } from 'src/copoun/entities/coupon.entity';
@InputType()
export class MenuItemInput {
  @Field(() => String)
  mealName: string;

  @Field(() => Int)
  price: number;
}

@InputType()
export class CreateStorefrontInput {
  @IsAlpha()
  @Field()
  name: string;
  @IsAlpha()
  @Field()
  address: string;
  @IsAlpha()
  @Field()
  image: string;
  @Field(() => [Number])
  zip: number[];
  @Field(() => [MenuItemInput], { defaultValue: [] })
  menu: MenuItemInput[];
  @Field(() => [CouponInputType], { defaultValue: [] })
  coupon: CouponInputType[];
}

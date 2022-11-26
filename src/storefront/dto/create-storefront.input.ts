import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsAlphanumeric, Matches } from 'class-validator';
@InputType()
export class MenuItemInput {
  @Field(() => String)
  mealName: string;

  @Field(() => Int)
  price: number;
}
const capitalAndLowercaseRegex = /^[a-zA-Z ]*/;
@InputType()
export class CreateStorefrontInput {
  @Matches(capitalAndLowercaseRegex)
  @Field()
  name: string;
  @Matches(capitalAndLowercaseRegex)
  @Field()
  address: string;
  @Matches(/^\S*$/)
  @Field()
  image: string;
  @Field(() => [Number])
  zip: number[];
  @Field(() => [MenuItemInput], { defaultValue: [] })
  menu: MenuItemInput[];
  @Field(() => [Int], { nullable: true })
  coupons?: number[];
}

import { InputType, Field, Int } from '@nestjs/graphql';
import { Matches } from 'class-validator';
@InputType()
export class MenuItemInput {
  @Field(() => String)
  mealName: string;

  @Field(() => Int)
  price: number;
}

const CUSTOMER_NAME_REGEX = /^[A-Za-z.\s_-]+$/;
const ADDRESS_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
@InputType()
export class CreateStorefrontInput {
  @Matches(CUSTOMER_NAME_REGEX)
  @Field()
  name: string;
  @Matches(ADDRESS_REGEX)
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

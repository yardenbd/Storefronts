import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';
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
  @Field(() => [MenuItemInput], { defaultValue: [] })
  menu: MenuItemInput[];
  @Field(() => [Number])
  zip: number[];
  @Field(() => [Number])
  coupons: number[];
}

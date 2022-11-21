import { InputType, Field, Int } from '@nestjs/graphql';
@InputType()
export class MenuItemInput {
  @Field(() => String)
  mealName: string;

  @Field(() => Int)
  price: number;
}

@InputType()
export class CreateRestrauntInput {
  @Field()
  name: string;
  @Field()
  address: string;
  @Field()
  image: string;
  @Field(() => [MenuItemInput], { defaultValue: [] })
  menu: [MenuItemInput];
  @Field(() => [Number])
  zip: [number];
  @Field(() => [Number])
  coupon: [number];
}

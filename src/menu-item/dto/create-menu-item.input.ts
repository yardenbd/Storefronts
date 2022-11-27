import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMenuItemInput {
  @Field(() => String)
  mealName: string;

  @Field(() => String)
  storefrontId: string;

  @Field(() => Int)
  price: number;
}

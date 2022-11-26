import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class OrderDetailsInput {
  @Field(() => String)
  id: string;
  @Field(() => String)
  mealName: string;
  @Field(() => Int)
  price: number;
}

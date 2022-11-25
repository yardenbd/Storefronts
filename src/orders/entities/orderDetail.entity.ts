import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
@InputType()
export class OrderDetailInput {
  @Field(() => String)
  mealName: string;
  @Field(() => Int)
  price: number;
}

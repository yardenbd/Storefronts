import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class LineItemsInput {
  @Field(() => String)
  mealName: string;
  @Field(() => Int)
  price: number;
}

@ObjectType()
export class LineItems {
  @Field(() => String)
  mealName: string;
  @Field(() => Int)
  price: number;
}

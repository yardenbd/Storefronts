import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class OrderDetailInput {
  @Field(() => String)
  mealName: string;
  @Field(() => Int)
  price: number;
}

@ObjectType()
export class OrderDetail {
  @Field(() => String)
  mealName: string;
  @Field(() => Int)
  price: number;
}

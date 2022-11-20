import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRestrauntInput {
  @Field(() => Int)
  coupon: [number];
}

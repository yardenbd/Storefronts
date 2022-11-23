import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCopounInput {
  @Field(() => String)
  id: string;
  @Field(() => Number)
  coupon: number;
}

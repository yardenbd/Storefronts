import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCopounInput {
  @Field()
  code: string;
  @Field(() => Int)
  discount: number;
}

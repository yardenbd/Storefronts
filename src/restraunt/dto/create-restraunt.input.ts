import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRestrauntInput {
  @Field()
  name: string;
  @Field()
  address: string;
  @Field()
  image: string;
  // @Field(() => [Menu])
  // menu: [Menu];
  @Field(() => [Number])
  zip: [number];
  @Field(() => [Number])
  coupon: [number];
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderDetailInput {
  @Field()
  id: string;
  @Field(() => Int)
  quantity: number;
  @Field()
  orderid: string;
}

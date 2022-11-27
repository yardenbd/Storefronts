import { InputType, Int, Field } from '@nestjs/graphql';
import { IsUUID, IsInt } from 'class-validator';
@InputType()
export class CreateOrderDetailInput {
  @Field()
  @IsUUID()
  id: string;

  @Field(() => Int)
  @IsInt()
  quantity: number;

  @Field()
  @IsUUID()
  orderid: string;
}

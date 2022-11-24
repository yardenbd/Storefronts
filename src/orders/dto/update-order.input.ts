import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @IsUUID()
  @Field(() => String)
  id: string;
}

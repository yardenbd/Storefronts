import { CreateOrderDetailInput } from './create-order-detail.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class UpdateOrderDetailInput extends PartialType(
  CreateOrderDetailInput,
) {
  @Field(() => String)
  @IsUUID()
  id: string;
}

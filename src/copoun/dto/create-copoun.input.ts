import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsUUID } from 'class-validator';

@InputType()
export class CopounInput {
  @IsUUID()
  @Field(() => String)
  id: string;
  @IsNumber()
  @Field(() => Int)
  coupon: number;
}

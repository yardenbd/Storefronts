import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsNumber, IsUUID } from 'class-validator';

@InputType()
export class UpdateCopounInput {
  @IsUUID()
  @Field(() => String)
  id: string;
  @IsNumber()
  @Field(() => Int)
  coupon: number;
  @IsNumber()
  @Field(() => Int)
  couponToUpdate: number;
}

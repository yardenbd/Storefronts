import { InputType, Int, Field } from '@nestjs/graphql';
import { Matches, IsUUID, IsInt } from 'class-validator';

const capitalAndLowercaseRegex = /^[A-Za-z.\s_-]+$/;

@InputType()
export class CreateMenuItemInput {
  @Matches(capitalAndLowercaseRegex)
  @Field(() => String)
  mealName: string;

  @IsUUID()
  @Field(() => String)
  storefrontId: string;

  @IsInt()
  @Field(() => Int)
  price: number;
}

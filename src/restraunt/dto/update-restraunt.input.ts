import { CreateRestrauntInput } from './create-restraunt.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRestrauntInput extends PartialType(CreateRestrauntInput) {
  @Field(() => String)
  id: string;
}

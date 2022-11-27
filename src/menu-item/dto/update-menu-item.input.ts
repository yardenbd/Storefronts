import { CreateMenuItemInput } from './create-menu-item.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class UpdateMenuItemInput extends PartialType(CreateMenuItemInput) {
  @Field(() => String)
  @IsUUID()
  id: string;
}

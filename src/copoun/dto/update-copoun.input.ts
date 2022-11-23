import { CreateCopounInput } from './create-copoun.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCopounInput extends PartialType(CreateCopounInput) {}

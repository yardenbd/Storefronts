import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class Copoun {
  @Field()
  id: string;
  @Field()
  code: string;
  @Field(() => Int)
  discount: number;
}

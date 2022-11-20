import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Menu {
  @Field()
  mealName: string;

  @Field()
  price: number;
}

// import { ObjectType } from '@nestjs/graphql';
// export interface IMenu {
//   mealName: string;
//   price: number;
// }

// @ObjectType({
//   implements: () => [IMenu],
// })
// export class Human implements IMenu {
//   id: string;
//   name: string;
// }

import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Menu {
  @Field()
  mealName: string;

  @Field()
  price: number;
}

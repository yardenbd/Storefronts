import { InputType, Int, Field } from '@nestjs/graphql';
import { MenuItemInput } from 'src/restraunt/dto/create-restraunt.input';

@InputType()
export class CreateOrderInput {
  @Field()
  customerName: string;
  @Field()
  customerAddress: string;
  @Field(() => [MenuItemInput])
  orderDetails: [MenuItemInput];
  @Field(() => [Number], { nullable: true })
  copoun?: [number];
}

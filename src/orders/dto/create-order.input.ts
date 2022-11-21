import { InputType, Int, Field } from '@nestjs/graphql';
import { MenuItemInput } from 'src/restraunt/dto/create-restraunt.input';

@InputType()
export class CreateOrderInput {
  @Field()
  user_id: string;
  @Field(() => [MenuItemInput])
  order_details: [MenuItemInput];
  @Field(() => Int, { nullable: true })
  cupoun?: number;
}

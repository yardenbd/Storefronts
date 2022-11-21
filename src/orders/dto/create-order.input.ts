import { InputType, Int, Field } from '@nestjs/graphql';
import { MenuItemInput } from 'src/restraunt/dto/create-restraunt.input';

@InputType()
export class CreateOrderInput {
  @Field()
  user_id: string;
  @Field(() => [MenuItemInput], { defaultValue: [] })
  order_details: MenuItemInput;
}

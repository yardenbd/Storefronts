import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { OrderDetailsInput } from './orderDetail.entity';
@InputType()
export class CalcOrderInput {
  @Field(() => [OrderDetailsInput])
  orderDetail: OrderDetailsInput[];
  @Field(() => [Number], { nullable: true })
  coupons?: number[];
}
@ObjectType()
export class CalcOrder {
  @Field()
  mealName: string;
  @Field(() => Int)
  quantity: number;
  @Field(() => Int)
  price: number;
  @Field(() => Int)
  totalPrice?: number;
  @Field(() => [Int])
  coupons?: number[];
}

@ObjectType({ isAbstract: true })
class OrderItem {
  @Field()
  mealName: string;
  @Field(() => Int)
  quantity: number;
  @Field(() => Int)
  price: number;
}
@ObjectType()
export class OrderInformation {
  @Field(() => Int)
  totalPrice: number;
  @Field(() => [Int])
  coupons: number[];
  @Field(() => [OrderItem])
  menuItems: OrderItem[];
}

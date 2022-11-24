import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateOrderInput } from '../dto/create-order.input';

@InputType()
export class LineItemsInput {
  @Field(() => String)
  mealName: string;
  @Field(() => Int)
  price: number;
}

@ObjectType()
export class LineItems {
  @Field(() => String)
  mealName: string;
  @Field(() => Int)
  quantity: number;
}

@InputType()
export class CalcOrderInput {
  @Field(() => [LineItemsInput])
  lineItems: LineItemsInput[];
  @Field(() => [Number], { nullable: true })
  coupons?: number[];
}
@ObjectType()
export class CalcOrder {
  @Field(() => [LineItems])
  totalMeals: LineItems[];
  @Field(() => Number)
  totalPrice: number;
}
@ObjectType()
@Entity()
export class Order {
  @Field()
  @Column()
  @PrimaryGeneratedColumn('uuid')
  orderId: string;
  @Field()
  @Column()
  customerName: string;
  @Field()
  @Column()
  customerAddress: string;
  @Field(() => [LineItems])
  @Column({
    type: 'json',
    nullable: false,
  })
  lineItems: LineItems[];
  @Field(() => [Number], { nullable: true })
  @Column('int', { array: true, nullable: true })
  coupons?: number[];
  @Field(() => Int)
  @Column()
  totalPrice: number;
}

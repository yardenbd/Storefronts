import {
  ObjectType,
  Field,
  InterfaceType,
  Int,
  InputType,
} from '@nestjs/graphql';
import { MenuItem } from 'src/restraunt/entities/restraunt.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@InputType()
export class LineItemsInput {
  @Field(() => String)
  mealName: string;
  @Field(() => Int)
  price: number;
}

@InterfaceType()
export class LineItems {
  @Field(() => String)
  mealName: string;
  @Field(() => Int)
  quantity: number;
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
  lineItems: [LineItems];
  @Field(() => [Number], { nullable: true })
  @Column('int', { array: true, nullable: true })
  coupons?: [number];
  @Field(() => Int)
  @Column()
  totalPrice: number;
}

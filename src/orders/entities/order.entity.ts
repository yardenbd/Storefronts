import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OrderDetail } from './orderDetail.entity';

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
  @Field(() => [OrderDetail])
  @Column({
    type: 'json',
    nullable: false,
  })
  lineItems: OrderDetail[];
  @Field(() => [Number], { nullable: true })
  @Column('int', { array: true, nullable: true })
  coupons?: number[];
}

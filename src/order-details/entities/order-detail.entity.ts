import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Orders } from 'src/orders/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@ObjectType()
@Entity()
export class OrderDetail {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field()
  @Column()
  menuItemId: string;

  @Column()
  orderId: string;

  @ManyToOne((type) => Orders, (order) => order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Orders;
}

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MenuItem } from '../../menu-item/entities/menu-item.entity';
import { Order } from '../../orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class OrderDetail {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(() => Int)
  @Column()
  quantity: string;
  @ManyToOne(() => Order, (order) => order.order)
  order: Order;
  // @Field(() => String)
  // @ManyToOne(() => MenuItem, (menuItem) => menuItem.id)
  // item: string;
}

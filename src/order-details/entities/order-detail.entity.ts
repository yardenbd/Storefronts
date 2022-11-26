import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Orders } from '../../orders/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MenuItem } from '../../menu-item/entities/menu-item.entity';
@ObjectType()
@Entity()
export class OrderDetail {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Column({ type: 'uuid' })
  menuItemId: string;

  @ManyToOne((type) => MenuItem, (MenuItem) => MenuItem, {
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'menuItemId' })
  menuItem: MenuItem;

  @Column({ type: 'uuid' })
  orderId: string;

  @ManyToOne((type) => Orders, (order) => order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Orders;
}

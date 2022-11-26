import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';
import { Storefront } from '../../storefront/entities/storefront.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@ObjectType()
@Entity()
export class MenuItem {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  mealName: string;

  @Field(() => Int)
  @Column()
  price: number;

  @ManyToOne(() => Storefront, (storefront) => storefront.menu)
  storefront: Storefront;
}

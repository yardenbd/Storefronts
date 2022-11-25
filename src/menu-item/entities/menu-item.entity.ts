import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Storefront } from 'src/storefront/entities/storefront.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
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

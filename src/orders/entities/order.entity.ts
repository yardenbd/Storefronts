import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Coupon } from '../../copoun/entities/coupon.entity';
import { Storefront } from 'src/storefront/entities/storefront.entity';

@ObjectType()
@Entity({ name: 'orders' })
export class Orders {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  customerName: string;

  @Field()
  @Column()
  customerAddress: string;

  @Field(() => [Coupon])
  @Column('json', { nullable: true })
  coupons?: Coupon[];
}

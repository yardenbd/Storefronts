import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Coupon } from '../../copoun/entities/coupon.entity';

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

  @Field(() => Int)
  @Column()
  totalPrice: number;

  @Field(() => [Int])
  @Column('int', { array: true, nullable: true })
  coupons?: number[];
}

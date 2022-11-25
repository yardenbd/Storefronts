import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrderDetail } from '../../order-details/entities/order-details.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Coupon } from '../../copoun/entities/coupon.entity';

@ObjectType()
@Entity()
export class Order {
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
  @Field(() => [OrderDetail])
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
  })
  order: OrderDetail[];
}

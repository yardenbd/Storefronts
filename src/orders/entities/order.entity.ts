import { ObjectType, Field } from '@nestjs/graphql';
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

  @Field(() => [Coupon])
  @Column('json', { nullable: true })
  coupons?: Coupon[];
}

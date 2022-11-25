import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Storefront } from '../../storefront/entities/storefront.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Coupon {
  @Field()
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(() => Int)
  @Column()
  discount: number;
  @ManyToOne(() => Storefront, (storefront) => storefront.coupon)
  storefront: Storefront;
}

@InputType()
export class CouponInputType {
  @Field(() => Int)
  discount: number;
}

@ObjectType()
export class Tests {
  @Field(() => Int)
  discount: number;
}

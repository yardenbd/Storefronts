import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
export class Coupon {
  @Field()
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;
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

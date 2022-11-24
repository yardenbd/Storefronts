import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { LineItems } from './lineItems.entity';

@ObjectType()
@Entity()
export class Order {
  @Field()
  @Column()
  @PrimaryGeneratedColumn('uuid')
  orderId: string;
  @Field()
  @Column()
  customerName: string;
  @Field()
  @Column()
  customerAddress: string;
  @Field(() => [LineItems])
  @Column({
    type: 'json',
    nullable: false,
  })
  lineItems: LineItems[];
  @Field(() => [Number], { nullable: true })
  @Column('int', { array: true, nullable: true })
  coupons?: number[];
}

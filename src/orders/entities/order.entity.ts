import { ObjectType, Field, InterfaceType, Int } from '@nestjs/graphql';
import { MenuItem } from 'src/restraunt/entities/restraunt.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@InterfaceType()
class LineItems {
  @Field(() => String)
  mealName: string;
  @Field(() => Int)
  quantity: number;
}
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
    array: true,
    type: 'json',
    nullable: false,
  })
  lineItems: [LineItems];
  @Field(() => [Number], { nullable: true })
  @Column('int', { array: true, nullable: true })
  coupons?: [number];
}

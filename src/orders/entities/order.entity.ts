import { ObjectType, Field } from '@nestjs/graphql';
import { MenuItem } from 'src/restraunt/entities/restraunt.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  @Field(() => [MenuItem])
  @Column({
    type: 'json',
    nullable: false,
  })
  orderDetails: [MenuItem];
  @Field(() => [Number], { nullable: true })
  @Column('int', { array: true, nullable: true })
  copoun?: [number];
}

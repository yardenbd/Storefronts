import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@ObjectType()
@Entity()
export class Restraunt {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column()
  name: string;
  @Field()
  @Column()
  address: string;
  @Field()
  @Column()
  image: string;
  // @Field(() => [Menu])
  // @Column('json', { array: true, nullable: false })
  // menu: [Menu];
  @Field(() => [Number], {})
  @Column('int', { array: true, nullable: false })
  zip: [number];
  @Field(() => [Number], {})
  @Column('int', { array: true, nullable: false })
  coupon: [number];
}

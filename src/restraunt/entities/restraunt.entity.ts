import { ObjectType, Field } from '@nestjs/graphql';
import { Menu } from 'src/types';
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
  @Field(() => [Menu], {})
  @Column('json', { array: true, nullable: false })
  menu: [Menu];
  @Field()
  @Column()
  zip: number;
  @Field(() => [Number], {})
  @Column('int', { array: true, nullable: false })
  coupon: [Number];
}

import { ObjectType, Field, InterfaceType, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@InterfaceType()
export class MenuItem {
  @Field(() => String)
  mealName: string;

  @Field(() => Int)
  price: number;
}

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
  @Field(() => [MenuItem])
  @Column({
    type: 'json',
    nullable: false,
  })
  menu: [MenuItem];
  @Field(() => [Number])
  @Column('int', { array: true, nullable: false })
  zip: [number];
  @Field(() => [Number])
  @Column('int', { array: true, nullable: false })
  coupon: [number];
}

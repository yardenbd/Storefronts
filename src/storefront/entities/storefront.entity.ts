import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@ObjectType()
export class MenuItem {
  @Field(() => String)
  mealName: string;

  @Field(() => Int)
  price: number;
}

@ObjectType()
@Entity()
export class Storefront {
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
  menu: MenuItem[];
  @Field(() => [Int])
  @Column('int', { array: true, nullable: false })
  zip: number[];
  @Field(() => [Int])
  @Column('int', { array: true, nullable: false })
  coupons: number[];
}

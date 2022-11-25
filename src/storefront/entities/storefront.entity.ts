import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MenuItem } from '../../menu-item/entities/menu-item.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Coupon } from 'src/copoun/entities/coupon.entity';

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
  @Field(() => [Int])
  @Column('int', { array: true, nullable: false })
  zip: number[];
  @Field(() => [MenuItem])
  @OneToMany(() => MenuItem, (menuItem) => menuItem.storefront, {
    cascade: true,
  })
  menu: MenuItem[];
  @Field(() => [Coupon])
  @OneToMany(() => Coupon, (coupon) => coupon.storefront, {
    cascade: true,
  })
  coupon: Coupon[];
}

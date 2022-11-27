import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Storefront } from '../../storefront/entities/storefront.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
@ObjectType({ isAbstract: true })
@Entity()
export class MenuItem {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  mealName: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => String)
  @Column({ type: 'uuid' })
  storefrontId: string;

  @ManyToOne(() => Storefront, (storefront) => storefront.menu)
  storefront: Storefront;
}

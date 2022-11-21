import { ObjectType, Field, Int, InterfaceType } from '@nestjs/graphql';
import { MenuItem } from 'src/restraunt/entities/restraunt.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @Field()
  @Column()
  @PrimaryGeneratedColumn('uuid')
  order_id: string;
  @Field()
  @Column()
  user_id: string;
  @Field(() => [MenuItem], { defaultValue: [] })
  @Column({
    type: 'json',
    nullable: false,
  })
  order_details: MenuItem;
}

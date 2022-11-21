import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@ObjectType()
@Entity()
export class Copoun {
  @Field()
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column()
  code: string;
  @Field(() => Int)
  @Column()
  discount: number;
}

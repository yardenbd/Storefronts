import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RestrauntService } from './restraunt.service';
import { MenuItem, Restraunt } from './entities/restraunt.entity';
import { CreateRestrauntInput } from './dto/create-restraunt.input';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';
import { CreateCopounInput } from '../copoun/dto/create-copoun.input';
import { Pagination } from '../types';
import { ConfigService } from '@nestjs/config/dist';
@Resolver(() => Restraunt)
export class RestrauntResolver {
  constructor(private readonly restrauntService: RestrauntService) {}

  @Mutation(() => Restraunt)
  createRestraunt(
    @Args('createRestrauntInput', { type: () => CreateRestrauntInput })
    createRestrauntInput: CreateRestrauntInput,
  ) {
    return this.restrauntService.create(createRestrauntInput);
  }
  @Mutation(() => Restraunt, { name: 'updateRestraunt' })
  updateRestraunt(
    @Args('updateRestrauntInput', { type: () => CreateRestrauntInput })
    updateRestrauntInput: UpdateRestrauntInput,
  ) {
    return this.restrauntService.update(updateRestrauntInput);
  }
  @Mutation(() => Restraunt, { name: 'removeRestraunt' })
  removeRestraunt(@Args('id', { type: () => String }) id: string) {
    return this.restrauntService.remove(id);
  }

  @Query(() => [Restraunt], { name: 'restrauntFindAll' })
  findAll(
    @Args('query', {
      type: () => Pagination,
    })
    query: Pagination,
  ) {
    return this.restrauntService.findAll(query);
  }

  @Query(() => [Restraunt], { name: 'findByZip' })
  findBasedOnZipCode(
    @Parent()
    @Args('zip', { type: () => Number })
    zip: number,
    @Args('query', {
      type: () => Pagination,
    })
    query: Pagination,
  ) {
    return this.restrauntService.findBasedOnZipCode(zip, query);
  }
  @Query(() => [MenuItem], { name: 'getMenu' })
  getRestrauntMenu(@Args('id', { type: () => String }) id: string) {
    return this.restrauntService.getMenu(id);
  }
  @Query(() => Restraunt, { name: 'findOneRestraunt' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.restrauntService.findOne(id);
  }
  @Mutation(() => Boolean)
  createCopoun(
    @Args('CreateCouponInput') createCouponInput: CreateCopounInput,
  ) {
    return this.restrauntService.createCoupon(createCouponInput);
  }
  @Query(() => [Number], { name: 'FindAllCoupons' })
  findAllCoupons(
    @Args('query', {
      type: () => Pagination,
    })
    query: Pagination,
  ) {
    return this.restrauntService.findAllCoupons(query);
  }
}

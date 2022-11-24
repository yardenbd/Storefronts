import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StorefrontService } from './storefront.service';
import { MenuItem, Storefront } from './entities/storefront.entity';
import { CreateStorefrontInput } from './dto/create-storefront.input';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import { CreateCopounInput } from '../copoun/dto/create-copoun.input';
import { Pagination } from '../types';
@Resolver(() => Storefront)
export class StorefrontResolver {
  constructor(private readonly storefrontService: StorefrontService) {}

  @Mutation(() => Storefront)
  createStorefront(
    @Args('createStorefrontInput', { type: () => CreateStorefrontInput })
    createStorefrontInput: CreateStorefrontInput,
  ) {
    return this.storefrontService.create(createStorefrontInput);
  }
  @Mutation(() => Storefront, { name: 'updateStorefront' })
  updateStorefront(
    @Args('updateStorefrontInput', { type: () => CreateStorefrontInput })
    updateStorefrontInput: UpdateStorefrontInput,
  ) {
    return this.storefrontService.update(updateStorefrontInput);
  }
  @Mutation(() => Storefront, { name: 'removeStorefront' })
  removeStorefront(@Args('id', { type: () => String }) id: string) {
    return this.storefrontService.remove(id);
  }

  @Query(() => [Storefront], { name: 'storefrontFindAll' })
  findAll(
    @Args('query', {
      type: () => Pagination,
    })
    query: Pagination,
  ) {
    return this.storefrontService.findAll(query);
  }

  @Query(() => [Storefront], { name: 'findByZip' })
  findBasedOnZipCode(
    @Args('zip', { type: () => Number })
    zip: number,
    @Args('query', {
      type: () => Pagination,
    })
    query: Pagination,
  ) {
    return this.storefrontService.findBasedOnZipCode(zip, query);
  }
  @Query(() => [MenuItem], { name: 'getMenu' })
  getStorefrontMenu(@Args('id', { type: () => String }) id: string) {
    return this.storefrontService.getMenu(id);
  }
  @Query(() => Storefront, { name: 'findOneStorefront' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.storefrontService.findOne(id);
  }
  @Mutation(() => Boolean)
  createCopoun(
    @Args('CreateCouponInput') createCouponInput: CreateCopounInput,
  ) {
    return this.storefrontService.createCoupon(createCouponInput);
  }
  @Query(() => [Number], { name: 'FindAllCoupons' })
  findAllCoupons(
    @Args('query', {
      type: () => Pagination,
    })
    query: Pagination,
  ) {
    return this.storefrontService.findAllCoupons(query);
  }
}

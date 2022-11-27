import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StorefrontService } from './storefront.service';
import { Storefront } from './entities/storefront.entity';
import { CreateStorefrontInput } from './dto/create-storefront.input';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import { Pagination } from '../types';
import { MenuItem } from '../menu-item/entities/menu-item.entity';
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
    @Args('updateStorefrontInput', {
      type: () => CreateStorefrontInput,
    })
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
    @Args('pagination', {
      type: () => Pagination,
    })
    pagination?: Pagination,
  ) {
    return this.storefrontService.findAll(pagination);
  }

  @Query(() => [Storefront], { name: 'findByZip' })
  findBasedOnZipCode(
    @Args('zip', { type: () => Number })
    zip: number,
    @Args('pagination', {
      type: () => Pagination,
    })
    pagination?: Pagination,
  ) {
    return this.storefrontService.findBasedOnZipCode(zip, pagination);
  }
  @Query(() => [MenuItem], { name: 'getMenu' })
  getStorefrontMenu(@Args('id', { type: () => String }) id: string) {
    return this.storefrontService.getMenu(id);
  }
  @Query(() => Storefront, { name: 'findOneStorefront' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.storefrontService.findOne(id);
  }
}

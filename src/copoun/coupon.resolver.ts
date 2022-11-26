import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Pagination } from '../types';
import { CouponService } from './coupon.service';
import { CopounInput } from './dto/create-copoun.input';
import { UpdateCopounInput } from './dto/update-copoun.input';
@Resolver(() => Int)
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @Mutation(() => Int)
  createCopoun(@Args('CreateCouponInput') createCouponInput: CopounInput) {
    return this.couponService.create(createCouponInput);
  }
  @Mutation(() => Int, { name: 'updateCoupon' })
  updateCoupon(
    @Args('updateCouponInput', { type: () => UpdateCopounInput })
    coupon: CopounInput & { couponToUpdate: number },
  ) {
    return this.couponService.update(coupon);
  }
  @Mutation(() => Int, { name: 'removeCoupon' })
  removeCoupon(
    @Args('CopounInput', { type: () => CopounInput })
    copounToRemove: CopounInput,
  ) {
    return this.couponService.remove(copounToRemove);
  }
  @Query(() => [Int], { name: 'FindAllCoupons' })
  findAllCoupons(
    @Args('query', {
      type: () => Pagination,
    })
    query: Pagination,
  ) {
    return this.couponService.findAll(query);
  }
  @Query(() => Int, { name: 'findOneCoupon' })
  findOne(
    @Args('copounInput', { type: () => CopounInput }) copounInput: CopounInput,
  ) {
    return this.couponService.findOne(copounInput);
  }
}

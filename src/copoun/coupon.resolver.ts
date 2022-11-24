import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Pagination } from '../types';
import { CouponService } from './coupon.service';
import { CreateCopounInput } from './dto/create-copoun.input';
@Resolver(() => [Int])
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  // @Mutation(() => Int, { name: 'updateCoupon' })
  // updateCoupon(
  //   @Args('updateCouponInput', { type: () => Int })
  //   coupon: number,
  // ) {
  //   return this.couponService.update(coupon);
  // }
  // @Mutation(() => Coupon, { name: 'removeCoupon' })
  // removeCoupon(@Args('id', { type: () => String }) id: string) {
  //   return this.couponService.remove(id);
  // }

  // @Query(() => Coupon, { name: 'findOneCoupon' })
  // findOne(@Args('id', { type: () => String }) id: string) {
  //   return this.couponService.findOne(id);
  // }
  @Mutation(() => Boolean)
  createCopoun(
    @Args('CreateCouponInput') createCouponInput: CreateCopounInput,
  ) {
    return this.couponService.createCoupon(createCouponInput);
  }
  @Query(() => [Number], { name: 'FindAllCoupons' })
  findAllCoupons(
    @Args('query', {
      type: () => Pagination,
    })
    query: Pagination,
  ) {
    return this.couponService.findAllCoupons(query);
  }
}

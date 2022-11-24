import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Any } from 'typeorm';
import { CreateCopounInput } from 'src/copoun/dto/create-copoun.input';
import { Pagination } from '../types';
import { Storefront } from 'src/storefront/entities/storefront.entity';
@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Storefront)
    private storefrontRepository: Repository<Storefront>,
  ) {}

  createCoupon(createCouponInput: CreateCopounInput) {
    const updateQuery =
      'update storefront set coupons = array_append(coupons,$1) where id =$2';
    return this.storefrontRepository.query(updateQuery, [
      createCouponInput.coupon,
      createCouponInput.id,
    ]);
  }
  findAllCoupons(query: Pagination = { skip: 0, take: 5 }) {
    const { skip, take } = query;
    return this.storefrontRepository
      .createQueryBuilder()
      .select('coupons')
      .skip(skip)
      .take(take)
      .execute();
  }
}

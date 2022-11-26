import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CopounInput } from '../copoun/dto/create-copoun.input';
import { Pagination } from '../types';
import { Storefront } from '../storefront/entities/storefront.entity';
@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Storefront)
    private storefrontRepository: Repository<Storefront>,
  ) {}

  async create(createCouponInput: CopounInput) {
    const updateQuery =
      'update storefront set coupons = array_append(coupons,$1) where id =$2';
    const createdCoupon = await this.storefrontRepository.query(updateQuery, [
      createCouponInput.coupon,
      createCouponInput.id,
    ]);
    console.log('createdCoupon', createdCoupon);
    return createdCoupon[1];
  }
  async findAll(query: Pagination = { skip: 0, take: 5 }) {
    const { skip, take } = query;
    return this.storefrontRepository
      .createQueryBuilder()
      .select('coupons')
      .skip(skip)
      .take(take)
      .execute()
      .then((response) => response[0].coupons);
  }
  async update(updateCoupon: CopounInput & { couponToUpdate: number }) {
    const { coupon, couponToUpdate, id } = updateCoupon;
    const updateStatement =
      'UPDATE public.storefront SET coupons = array_replace(coupons, $1, $2) WHERE id = $3 ';
    const updatedCoupon = await this.storefrontRepository.query(
      updateStatement,
      [couponToUpdate, coupon, id],
    );
    return updatedCoupon[1];
  }
  async remove(couponToRemove: CopounInput) {
    const { coupon, id } = couponToRemove;
    const updateStatement =
      'UPDATE public.storefront SET coupons = array_remove(coupons, $1) WHERE id = $2 ';
    const removeCoupon = await this.storefrontRepository.query(
      updateStatement,
      [coupon, id],
    );
    return removeCoupon[1];
  }
  async findOne(couponToFind: CopounInput) {
    const { coupon, id } = couponToFind;
    const selectedCoupon = await this.storefrontRepository
      .createQueryBuilder()
      .select('coupons')
      .where('id = :id', { id })
      .andWhere(':coupon = ANY(coupons)', { coupon })
      .execute()
      .then((response) => response[0].coupons);

    return selectedCoupon[0];
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStorefrontInput } from './dto/create-storefront.input';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import { Repository, Any } from 'typeorm';
import { Storefront } from './entities/storefront.entity';
import { CreateCopounInput } from 'src/copoun/dto/create-copoun.input';
import { Pagination } from '../types';
@Injectable()
export class StorefrontService {
  constructor(
    @InjectRepository(Storefront)
    private storefrontRepository: Repository<Storefront>,
  ) {}
  create(createStorefrontInput: CreateStorefrontInput): Promise<Storefront> {
    return this.storefrontRepository.save(createStorefrontInput);
  }
  findBasedOnZipCode(zip: number, query: Pagination) {
    const { skip, take } = query;
    return this.storefrontRepository.find({
      where: { zip: Any[zip] },
      take,
      skip,
    });
  }
  getMenu(id: string) {
    return this.storefrontRepository.findOne({
      select: ['menu'],
      where: { id },
    });
  }
  async findAll(query: Pagination = { skip: 0, take: 5 }) {
    const { skip, take } = query;
    const t = await this.storefrontRepository.find({ take, skip });
    console.log('t', t);
    return t;
  }

  findOne(id: string) {
    return this.storefrontRepository.findOne({ where: { id } });
  }
  update(updateStorefrontInput: UpdateStorefrontInput) {
    return this.storefrontRepository.save({
      ...updateStorefrontInput,
    });
  }

  remove(id: string) {
    return this.storefrontRepository.delete({ id });
  }
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

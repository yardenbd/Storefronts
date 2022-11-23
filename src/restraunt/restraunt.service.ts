import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestrauntInput } from './dto/create-restraunt.input';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';
import { Repository, Any } from 'typeorm';
import { Restraunt } from './entities/restraunt.entity';
import { CreateCopounInput } from 'src/copoun/dto/create-copoun.input';
import { Pagination } from '../types';
@Injectable()
export class RestrauntService {
  constructor(
    @InjectRepository(Restraunt)
    private restrauntRepository: Repository<Restraunt>,
  ) {}
  create(createRestrauntInput: CreateRestrauntInput): Promise<Restraunt> {
    return this.restrauntRepository.save(createRestrauntInput);
  }
  findBasedOnZipCode(zip: number, query: Pagination) {
    const { skip, take } = query;
    return this.restrauntRepository.find({
      where: { zip: Any[zip] },
      take,
      skip,
    });
  }
  getMenu(id: string) {
    return this.restrauntRepository.findOne({
      select: ['menu'],
      where: { id },
    });
  }
  async findAll(query: Pagination = { skip: 0, take: 5 }) {
    const { skip, take } = query;
    const t = await this.restrauntRepository.find({ take, skip });
    console.log('t', t);
    return t;
  }

  findOne(id: string) {
    return this.restrauntRepository.findOne({ where: { id } });
  }
  update(updateRestrauntInput: UpdateRestrauntInput) {
    return this.restrauntRepository.save({
      ...updateRestrauntInput,
    });
  }

  remove(id: string) {
    return this.restrauntRepository.delete({ id });
  }
  createCoupon(createCouponInput: CreateCopounInput) {
    const updateQuery =
      'update restraunt set coupons = array_append(coupons,$1) where id =$2';
    return this.restrauntRepository.query(updateQuery, [
      createCouponInput.coupon,
      createCouponInput.id,
    ]);
  }
  findAllCoupons(query: Pagination = { skip: 0, take: 5 }) {
    const { skip, take } = query;
    return this.restrauntRepository
      .createQueryBuilder()
      .select('coupons')
      .skip(skip)
      .take(take)
      .execute();
  }
}

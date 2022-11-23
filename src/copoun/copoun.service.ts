import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCopounInput } from './dto/update-copoun.input';
import { Repository } from 'typeorm';
import { Restraunt } from 'src/restraunt/entities/restraunt.entity';
import { UpdateRestrauntInput } from '../restraunt/dto/update-restraunt.input';
import { CreateCopounInput } from './dto/create-copoun.input';
@Injectable()
export class CopounService {
  constructor(
    @InjectRepository(Number)
    private restrauntRepository: Repository<Restraunt>,
  ) {}
  create(createCouponInput: CreateCopounInput) {
    const updateQuery =
      'update restraunt set coupons = array_append(coupons,$1) where id =$2';
    return this.restrauntRepository.query(updateQuery, [
      createCouponInput.coupon,
      createCouponInput.id,
    ]);
  }

  findAll() {
    return this.restrauntRepository.createQueryBuilder().select('coupons');
  }

  findOne(id: number) {
    return `This action returns a #${id} copoun`;
  }

  update(id: string, updateCopounInput: UpdateCopounInput) {
    return `This action updates a #${id} copoun`;
  }

  remove(id: number) {
    return `This action removes a #${id} copoun`;
  }
}

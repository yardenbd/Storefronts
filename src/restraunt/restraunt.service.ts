import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestrauntInput } from './dto/create-restraunt.input';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';
import { Repository, Any } from 'typeorm';
import { Restraunt } from './entities/restraunt.entity';
import { CreateCopounInput } from 'src/copoun/dto/create-copoun.input';
@Injectable()
export class RestrauntService {
  constructor(
    @InjectRepository(Restraunt)
    private restrauntRepository: Repository<Restraunt>,
  ) {}
  create(createRestrauntInput: CreateRestrauntInput): Promise<Restraunt> {
    return this.restrauntRepository.save(createRestrauntInput);
  }
  findBasedOnZipCode(zip: number) {
    return this.restrauntRepository.findBy({ zip: Any[zip] });
  }
  getMenu(id: string) {
    return this.restrauntRepository.findOne({
      select: ['menu'],
      where: { id },
    });
  }
  findAll() {
    return this.restrauntRepository.find();
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
  findAllCoupons() {
    return this.restrauntRepository.createQueryBuilder().select('coupons');
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestrauntInput } from './dto/create-restraunt.input';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';
import { Repository } from 'typeorm';
import { Restraunt } from './entities/restraunt.entity';
@Injectable()
export class RestrauntService {
  constructor(
    @InjectRepository(Restraunt)
    private restrauntRepository: Repository<Restraunt>,
  ) {}
  create(createRestrauntInput: CreateRestrauntInput): Promise<Restraunt> {
    const newRestraunt = this.restrauntRepository.create(createRestrauntInput);
    return this.restrauntRepository.save(newRestraunt);
  }
  findBasedOnZipCode(zip: number) {
    return this.restrauntRepository
      .createQueryBuilder()
      .where(':zip = ANY(zip)', { zip })
      .getMany();
  }
  getMenu(id: string) {
    return this.restrauntRepository
      .createQueryBuilder()
      .select('menu')
      .where('id = :id', { id });
  }
  findAll() {
    return this.restrauntRepository.createQueryBuilder().getMany();
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
    return this.restrauntRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}

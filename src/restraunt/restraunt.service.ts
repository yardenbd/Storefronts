import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateRestrauntInput,
  MenuItemInput,
} from './dto/create-restraunt.input';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';
import { Repository, Any } from 'typeorm';
import { MenuItem, Restraunt } from './entities/restraunt.entity';
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
  async getMenu(id: string) {
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
}

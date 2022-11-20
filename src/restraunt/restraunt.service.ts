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
    const emp = this.restrauntRepository.create(createRestrauntInput);
    return this.restrauntRepository.save(emp);
  }

  findAll() {
    return `This action returns all restraunt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restraunt`;
  }

  update(id: number, updateRestrauntInput: UpdateRestrauntInput) {
    return `This action updates a #${id} restraunt`;
  }

  remove(id: number) {
    return `This action removes a #${id} restraunt`;
  }
}

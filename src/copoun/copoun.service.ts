import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCopounInput } from './dto/create-copoun.input';
import { UpdateCopounInput } from './dto/update-copoun.input';
import { Copoun } from './entities/copoun.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CopounService {
  constructor(
    @InjectRepository(Copoun)
    private copounRepository: Repository<Copoun>,
  ) {}
  create(createCopounInput: CreateCopounInput) {
    const newCopoun = this.copounRepository.create(createCopounInput);
    return this.copounRepository.save(newCopoun);
  }

  findAll() {
    return `This action returns all copoun`;
  }

  findOne(id: number) {
    return `This action returns a #${id} copoun`;
  }

  update(id: number, updateCopounInput: UpdateCopounInput) {
    return `This action updates a #${id} copoun`;
  }

  remove(id: number) {
    return `This action removes a #${id} copoun`;
  }
}

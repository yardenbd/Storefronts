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
    return this.restrauntRepository.query(
      'SELECT * FROM restraunt WHERE $1 = ANY(zip)',
      [zip],
    );
  }
  getMenu(id: string) {
    return this.restrauntRepository.query(
      'SELECT menu FROM restraunt WHERE id = $1',
      [id],
    );
  }
  findAll() {
    return this.restrauntRepository.query('SELECT * FROM restraunt');
  }

  findOne(id: number) {
    return `This action returns a #${id} restraunt`;
  }
  update(id: string, updateRestrauntInput: UpdateRestrauntInput) {
    return `This action updates a #${id} restraunt`;
  }

  remove(id: number) {
    return `This action removes a #${id} restraunt`;
  }
}

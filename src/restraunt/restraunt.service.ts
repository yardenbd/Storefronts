import { Injectable } from '@nestjs/common';
import { CreateRestrauntInput } from './dto/create-restraunt.input';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';

@Injectable()
export class RestrauntService {
  create(createRestrauntInput: CreateRestrauntInput) {
    return 'This action adds a new restraunt';
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStorefrontInput } from './dto/create-storefront.input';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import { Repository, Any } from 'typeorm';
import { Storefront } from './entities/storefront.entity';
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
  findAll(query: Pagination = { skip: 0, take: 5 }) {
    const { skip, take } = query;
    return this.storefrontRepository.find({ take, skip });
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
}

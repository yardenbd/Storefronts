import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStorefrontInput } from './dto/create-storefront.input';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import { Repository, Any } from 'typeorm';
import { Storefront } from './entities/storefront.entity';
import { Pagination } from '../types';
import { MenuItem } from '../menu-item/entities/menu-item.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class StorefrontService {
  constructor(
    @InjectRepository(Storefront)
    private storefrontRepository: Repository<Storefront>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}
  create(createStorefrontInput: CreateStorefrontInput): Promise<Storefront> {
    const { menu } = createStorefrontInput;
    const menuItemWithId = menu.map((item) => {
      return {
        ...item,
        id: uuidv4(),
      };
    });
    const storefrontToCreate: CreateStorefrontInput = {
      ...createStorefrontInput,
      menu: menuItemWithId,
    };
    return this.storefrontRepository.save(storefrontToCreate);
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
    return this.menuItemRepository.find({
      where: { storefront: { id } },
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

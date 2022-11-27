import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';
import { MenuItem } from './entities/menu-item.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'src/types';
@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}
  create(createMenuItemInput: CreateMenuItemInput) {
    const { mealName, price, storefrontId } = createMenuItemInput;
    return this.menuItemRepository.save({
      mealName,
      price,
      storefront: { id: storefrontId },
    });
  }

  findAll(query: Pagination = { skip: 0, take: 5 }) {
    const { skip, take } = query;
    return this.menuItemRepository.find({
      take,
      skip,
      cache: true,
    });
  }

  findOne(id: string) {
    return this.menuItemRepository.findOne({ where: { id } });
  }

  update(updateMenuItemInput: UpdateMenuItemInput) {
    return this.menuItemRepository.save(updateMenuItemInput);
  }

  remove(id: string) {
    return this.menuItemRepository.delete({ id });
  }
}

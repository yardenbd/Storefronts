import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MenuItemService } from './menu-item.service';
import { MenuItem } from './entities/menu-item.entity';
import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';
import { Pagination } from '../types';

@Resolver(() => MenuItem)
export class MenuItemResolver {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Mutation(() => MenuItem, { name: 'createMenuItem' })
  createMenuItem(
    @Args('createMenuItemInput', { type: () => CreateMenuItemInput })
    createMenuItemInput: CreateMenuItemInput,
  ) {
    return this.menuItemService.create(createMenuItemInput);
  }

  @Mutation(() => MenuItem, { name: 'updateMenuItem' })
  updateMenuItem(
    @Args('updateMenuItemInput', { type: () => UpdateMenuItemInput })
    updateMenuItemInput: UpdateMenuItemInput,
  ) {
    return this.menuItemService.update(updateMenuItemInput);
  }

  @Mutation(() => MenuItem, { name: 'removeMenuItem' })
  removeMenuItem(@Args('id', { type: () => String }) id: string) {
    return this.menuItemService.remove(id);
  }

  @Query(() => [MenuItem], { name: 'findAllMenuItems' })
  findAll(
    @Args('pagination', { type: () => Pagination }) pagination?: Pagination,
  ) {
    return this.menuItemService.findAll(pagination);
  }

  @Query(() => MenuItem, { name: 'findOneMenuItem' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.menuItemService.findOne(id);
  }
}

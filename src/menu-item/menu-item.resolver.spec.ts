import { Test, TestingModule } from '@nestjs/testing';
import { pagintaionObj } from '../constants';
import { desiredMenuItem, menuItemObj, updatedMenuItem } from './constants';
import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { MenuItemResolver } from './menu-item.resolver';
import { MenuItemService } from './menu-item.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';
describe('MenuItemResolver', () => {
  let resolver: MenuItemResolver;
  const menuItemResolverMock = {
    create: jest.fn((menuItem: CreateMenuItemInput) => menuItem),
    findAll: jest.fn(() => [menuItemObj]),
    findOne: jest.fn((id: string) => menuItemObj),
    remove: jest.fn((id: string) => menuItemObj),
    update: jest.fn((updatedMenuItem: UpdateMenuItemInput) => updatedMenuItem),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuItemResolver,
        {
          provide: MenuItemService,
          useValue: menuItemResolverMock,
        },
      ],
    }).compile();

    resolver = module.get<MenuItemResolver>(MenuItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('create', () => {
    it('should create a Menu item', async () => {
      const createdMenuItem = await resolver.createMenuItem(menuItemObj);
      expect(createdMenuItem).toMatchObject(desiredMenuItem);
    });
  });
  describe('Find all Menu Items', () => {
    it('should find and return a list of Menu Items', async () => {
      const allMenuItems = await resolver.findAll(pagintaionObj);
      expect(allMenuItems).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredMenuItem)]),
      );
    });
  });
  describe('Find one Menu Item', () => {
    it('should find and return a storefront menu', async () => {
      const response = await resolver.findOne(uuidv4());
      expect(response).toMatchObject(desiredMenuItem);
    });
  });
  describe('Update Menu Item', () => {
    it('should updates a single storefront ', async () => {
      const response = await resolver.updateMenuItem(updatedMenuItem);
      expect(response).toMatchObject(updatedMenuItem);
    });
  });
  describe('Delete storefront', () => {
    it('should updates a single storefront ', async () => {
      const response = resolver.removeMenuItem(uuidv4());
      expect(response).toMatchObject(desiredMenuItem);
    });
  });
});

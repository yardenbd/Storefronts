import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from '../types';
import { MenuItem } from './entities/menu-item.entity';
import { MenuItemService } from './menu-item.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  createMenuItemObj,
  desiredCreatedMenuItem,
  desiredMenuItem,
  menuItemObj,
  menuItems,
  updatedMenuItem,
} from './constants';
import { desiredDeletedObj, pagintaionObj } from '../constants';
describe('MenuItemService', () => {
  let service: MenuItemService;
  const menuItemRepositoryMock: MockType<Repository<MenuItem>> = {
    create: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
    save: jest.fn(),
    findBy: jest.fn(),
    delete: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuItemService,

        {
          provide: getRepositoryToken(MenuItem),
          useValue: menuItemRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<MenuItemService>(MenuItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a Menu item', async () => {
      menuItemRepositoryMock.save.mockReturnValue(createMenuItemObj);
      const createdMenuItem = await service.create(createMenuItemObj);
      expect(createdMenuItem).toMatchObject(desiredCreatedMenuItem);
    });
  });
  describe('Find all Menu Items', () => {
    it('should find and return a list of Menu Items', async () => {
      menuItemRepositoryMock.find.mockReturnValue(menuItems);
      const allMenuItems = await service.findAll(pagintaionObj);
      expect(allMenuItems).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredMenuItem)]),
      );
    });
  });
  describe('Find one Menu Item', () => {
    it('should find and return a storefront menu', async () => {
      menuItemRepositoryMock.findOne.mockReturnValue(menuItemObj);
      const response = await service.findOne(uuidv4());
      expect(response).toMatchObject(desiredMenuItem);
    });
  });
  describe('Update Menu Item', () => {
    it('should updates a single storefront ', async () => {
      menuItemRepositoryMock.save.mockReturnValue(updatedMenuItem);
      const response = await service.update(updatedMenuItem);
      expect(response).toMatchObject(updatedMenuItem);
    });
  });
  describe('Delete storefront', () => {
    it('should updates a single storefront ', async () => {
      menuItemRepositoryMock.delete.mockReturnValue(desiredDeletedObj);
      const response = service.remove(uuidv4());
      expect(response).toMatchObject(desiredDeletedObj);
    });
  });
});

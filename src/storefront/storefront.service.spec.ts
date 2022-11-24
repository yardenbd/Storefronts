import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Storefront } from './entities/storefront.entity';
import { StorefrontService } from './storefront.service';
import { Repository } from 'typeorm';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import {
  desiredStorefront,
  storefrontObj,
  storefrontTestId,
  desiredMenuItem,
  storefrontArray,
  pagintaionObj,
} from '../constants';
import { MockType } from 'src/types';

describe('StorefrontService', () => {
  let service: StorefrontService;
  const storefrontRepositoryMock: MockType<Repository<Storefront>> = {
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
        StorefrontService,
        {
          provide: getRepositoryToken(Storefront),
          useValue: storefrontRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<StorefrontService>(StorefrontService);
  });
  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Create storefront', () => {
    it('should create a new storefront', async () => {
      storefrontRepositoryMock.save.mockReturnValue(storefrontObj);
      const newRestarunt = await service.create(storefrontObj);
      expect(newRestarunt).toMatchObject(desiredStorefront);
    });
  });
  describe('Find all', () => {
    it('should get all storefronts', async () => {
      storefrontRepositoryMock.find.mockReturnValue([storefrontObj]);
      const allRestratuns = await service.findAll();
      expect(allRestratuns).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredStorefront)]),
      );
    });
  });
  describe('Find one menu', () => {
    it('should get a storefront menu', async () => {
      storefrontRepositoryMock.findOne.mockReturnValue(storefrontObj.menu);
      const response = await service.getMenu(storefrontObj.id);
      expect(response).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredMenuItem)]),
      );
    });
  });
  describe('Find all based on zip', () => {
    it('should get a storefront nearby based on zip code', async () => {
      const storefrontAvailableBasedOnZip = storefrontArray.filter(
        (storefront) => {
          if (storefront.zip.includes(4245)) {
            return storefront;
          }
        },
      );
      storefrontRepositoryMock.findBy.mockReturnValue(
        storefrontAvailableBasedOnZip,
      );
      const response = await service.findBasedOnZipCode(4245, pagintaionObj);
      expect(response).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredStorefront)]),
      );
    });
  });
  describe('Find one storefront', () => {
    it('should get a single storefront ', async () => {
      storefrontRepositoryMock.findOne.mockReturnValue(storefrontObj);
      const response = await service.findOne(storefrontTestId);
      expect(response).toMatchObject(desiredStorefront);
    });
  });
  describe('Update storefront', () => {
    it('should updates a single storefront ', async () => {
      const updateStorefrontObj: UpdateStorefrontInput = {
        id: storefrontTestId,
        name: 'testname',
        address: 'testaddress',
      };
      storefrontRepositoryMock.save.mockReturnValue(updateStorefrontObj);
      const response = await service.update(updateStorefrontObj);
      expect(response).toEqual(expect.objectContaining(updateStorefrontObj));
    });
  });
  describe('Delete storefront', () => {
    it('should updates a single storefront ', async () => {
      const deleted = { raw: [], affected: expect.any(Number) };
      storefrontRepositoryMock.delete.mockReturnValue(deleted);
      const response = await service.remove(storefrontObj.id);
      expect(response).toMatchObject(deleted);
    });
  });
});
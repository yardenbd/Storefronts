import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Restraunt } from './entities/restraunt.entity';
import { RestrauntService } from './restraunt.service';
import { Repository } from 'typeorm';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';
import {
  desiredRestraunt,
  restrauntObj,
  restrauntTestId,
  desiredMenuItem,
  storefrontArray,
} from '../constants';
import { MockType } from 'src/types';

describe('RestrauntService', () => {
  let service: RestrauntService;
  const restrauntRepositoryMock: MockType<Repository<Restraunt>> = {
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
        RestrauntService,
        {
          provide: getRepositoryToken(Restraunt),
          useValue: restrauntRepositoryMock,
        },
      ],
    }).compile();
    service = module.get<RestrauntService>(RestrauntService);
  });
  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Create restraunt', () => {
    it('should create a new restraunt', async () => {
      restrauntRepositoryMock.save.mockReturnValue(restrauntObj);
      const newRestarunt = await service.create(restrauntObj);
      expect(newRestarunt).toMatchObject(desiredRestraunt);
    });
  });
  describe('Find all', () => {
    it('should get all restraunts', async () => {
      restrauntRepositoryMock.find.mockReturnValue([restrauntObj]);
      const allRestratuns = await service.findAll();
      expect(allRestratuns).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredRestraunt)]),
      );
    });
  });
  describe('Find one menu', () => {
    it('should get a restraunt menu', async () => {
      restrauntRepositoryMock.findOne.mockReturnValue(restrauntObj.menu);
      const response = await service.getMenu(restrauntObj.id);
      expect(response).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredMenuItem)]),
      );
    });
  });
  describe('Find all based on zip', () => {
    it('should get a restraunt nearby based on zip code', async () => {
      const storefrontAvailableBasedOnZip = storefrontArray.filter(
        (storefront) => {
          if (storefront.zip.includes(4245)) {
            return storefront;
          }
        },
      );
      restrauntRepositoryMock.findBy.mockReturnValue(
        storefrontAvailableBasedOnZip,
      );
      const response = await service.findBasedOnZipCode(4245);
      expect(response).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredRestraunt)]),
      );
    });
  });
  describe('Find one restraunt', () => {
    it('should get a single restraunt ', async () => {
      restrauntRepositoryMock.findOne.mockReturnValue(restrauntObj);
      const response = await service.findOne(restrauntTestId);
      expect(response).toMatchObject(desiredRestraunt);
    });
  });
  describe('Update restraunt', () => {
    it('should updates a single restraunt ', async () => {
      const updateRestrauntObj: UpdateRestrauntInput = {
        id: restrauntTestId,
        name: 'testname',
        address: 'testaddress',
      };
      restrauntRepositoryMock.save.mockReturnValue(updateRestrauntObj);
      const response = await service.update(updateRestrauntObj);
      expect(response).toEqual(expect.objectContaining(updateRestrauntObj));
    });
  });
  describe('Delete restraunt', () => {
    it('should updates a single restraunt ', async () => {
      const deleted = { raw: [], affected: expect.any(Number) };
      restrauntRepositoryMock.delete.mockReturnValue(deleted);
      const response = await service.remove(restrauntObj.id);
      expect(response).toMatchObject(deleted);
    });
  });
});

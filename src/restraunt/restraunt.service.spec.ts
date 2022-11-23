import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Restraunt } from './entities/restraunt.entity';
import { RestrauntService } from './restraunt.service';
import { Repository } from 'typeorm';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';
import { createDbConfig } from '../config/db.config';
import {
  desiredRestraunt,
  restrauntId,
  restrauntObj,
  restrauntTestId,
  desiredMenuItem,
  storefrontArray,
} from '../constants';
export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

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
      // imports: [
      //   TypeOrmModule.forRootAsync({
      //     useFactory: () => ({
      //       type: 'postgres',
      //       host: 'localhost',
      //       name: 'yarden',
      //       port: 5432,
      //       username: 'postgres',
      //       password: 'Yb212081046',
      //       database: 'postgres',
      //       entities: [Restraunt],
      //       synchronize: true,
      //       logging: false,
      //     }),
      //   }),
      //   TypeOrmModule.forFeature([Restraunt]),
      // ],
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
      restrauntRepositoryMock.findBy.mockReturnValue(storefrontArray);
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

import { Test, TestingModule } from '@nestjs/testing';
import {
  desiredMenuItem,
  desiredRestraunt,
  pagintaionObj,
  restrauntObj,
  restrauntTestId,
} from '../constants';
import { CreateRestrauntInput } from './dto/create-restraunt.input';
import { RestrauntResolver } from './restraunt.resolver';
import { RestrauntService } from './restraunt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDbConfig } from '../config/db.config';
import { Restraunt } from './entities/restraunt.entity';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';
import { ConfigModule } from '@nestjs/config';

describe('Restraunt Resolver', () => {
  let resolver: RestrauntResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestrauntResolver,
        {
          provide: RestrauntService,
          useFactory: () => ({
            create: jest.fn((restraunt: CreateRestrauntInput) => restraunt),
            findAll: jest.fn(() => [restrauntObj]),
            findOne: jest.fn((id: string) => restrauntObj),
            removeRestraunt: jest.fn((id: string) => restrauntObj),
            remove: jest.fn((id: string) => restrauntObj),
            updateRestraunt: jest.fn(
              (updateRestrauntObj: UpdateRestrauntInput) => updateRestrauntObj,
            ),
            update: jest.fn(
              (updateRestrauntObj: UpdateRestrauntInput) => updateRestrauntObj,
            ),
            getMenu: jest.fn(() => [desiredMenuItem]),
            findBasedOnZipCode: jest.fn((zip: number) => [restrauntObj]),
          }),
        },
      ],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useFactory: async () => createDbConfig(),
        }),
        TypeOrmModule.forFeature([Restraunt]),
      ],
    }).compile();
    resolver = module.get<RestrauntResolver>(RestrauntResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('create', () => {
    it('should create a Stroefront', async () => {
      const restraunt = await resolver.createRestraunt(restrauntObj);
      expect(restraunt).toMatchObject(desiredRestraunt);
    });
  });
  describe('Find all Storefronts', () => {
    it('should find and return a list of customers', async () => {
      const allRestratuns = await resolver.findAll(pagintaionObj);
      console.log('allRestratuns', allRestratuns);
      expect(allRestratuns).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredRestraunt)]),
      );
    });
  });
  describe('Find one menu', () => {
    it('should find and return a storefront menu', async () => {
      const response = await resolver.getRestrauntMenu(restrauntObj.id);
      console.log('response', response);
      expect(response).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredMenuItem)]),
      );
    });
  });
  describe('Find all based on zip', () => {
    it('should find and return a customer invoice', async () => {
      const response = await resolver.findBasedOnZipCode(4245, pagintaionObj);
      expect(response).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredRestraunt)]),
      );
    });
  });
  describe('Find one restraunt', () => {
    it('should get a single restraunt ', async () => {
      const response = await resolver.findOne(restrauntTestId);
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

      const response = await resolver.updateRestraunt(updateRestrauntObj);
      expect(response).toEqual(expect.objectContaining(updateRestrauntObj));
    });
  });
  describe('Delete restraunt', () => {
    it('should updates a single restraunt ', async () => {
      const response = await resolver.removeRestraunt(restrauntObj.id);
      expect(response).toMatchObject(desiredRestraunt);
    });
  });
});

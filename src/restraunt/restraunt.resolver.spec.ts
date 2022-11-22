import { Test, TestingModule } from '@nestjs/testing';
import {
  desiredMenuItem,
  desiredRestraunt,
  restrauntObj,
  restrauntTestId,
} from '../constants';
import { CreateRestrauntInput } from './dto/create-restraunt.input';
import { RestrauntResolver } from './restraunt.resolver';
import { RestrauntService } from './restraunt.service';
import { v4 as uuidv4 } from 'uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDbConfig } from '../config/db.config';
import { Restraunt } from './entities/restraunt.entity';

describe('Restraunt Resolver', () => {
  return;
  let resolver: RestrauntResolver;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestrauntResolver,
        {
          provide: RestrauntService,
          useFactory: () => ({
            create: jest.fn((restraunt: CreateRestrauntInput) => ({
              id: uuidv4(),
              ...restraunt,
            })),
            findAll: jest.fn(() => [restrauntObj]),
            findOne: jest.fn((id: string) => ({
              id: id,
              name: 'John Doe',
              email: 'john.doe@email.com',
              phone: '3134045867',
              address: '123 Road, Springfied, MO',
            })),
          }),
        },
      ],
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => createDbConfig<Restraunt>(Restraunt),
        }),
        TypeOrmModule.forFeature([Restraunt]),
      ],
    }).compile();
    resolver = module.get<RestrauntResolver>(RestrauntResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  // describe('create', () => {
  //   it('should create a Stroefront', async () => {
  //     const restraunt = await resolver.createRestraunt(restrauntObj);
  //     expect(restraunt).toMatchObject(desiredRestraunt);
  //   });
  // });
  describe('Find all', () => {
    it('should find and return a list of customers', async () => {
      const allRestratuns = await resolver.findAll();
      console.log('allRestratuns', allRestratuns);
      expect(allRestratuns).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredRestraunt)]),
      );
    });
  });
  // describe('Find one menu', () => {
  //   it('should find and return a storefront menu', async () => {
  //     const response = await resolver.getRestrauntMenu(restrauntTestId);
  //     expect(response.menu).toEqual(
  //       expect.arrayContaining([expect.objectContaining(desiredMenuItem)]),
  //     );
  //   });
  // });
  // describe('createCustomer', () => {
  //   it('should find and return a customer invoice', async () => {
  //     const customer = await resolver.createCustomer(
  //       'John Doe',
  //       'john.doe@email.com',
  //       '3134045867',
  //       '123 Road, Springfied, MO',
  //     );
  //     expect(customer).toEqual({
  //       id: '1234',
  //       name: 'John Doe',
  //       email: 'john.doe@email.com',
  //       phone: '3134045867',
  //       address: '123 Road, Springfied, MO',
  //     });
  //   });
  // });
});

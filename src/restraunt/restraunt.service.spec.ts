import { v4 as uuidv4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem, Restraunt } from './entities/restraunt.entity';
import { RestrauntService } from './restraunt.service';
import { Repository } from 'typeorm';
type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
const restrauntObj: Restraunt = {
  address: 'Haalisaczxzya 48',
  coupon: [10],
  image: 'https://picsum.photos/200/300',
  id: uuidv4(),
  name: 'zcxz',
  menu: [
    { mealName: 'Burger', price: 50 },
    { mealName: 'French Fries', price: 30 },
  ],
  zip: [223, 443, 111],
};
const desiredRestraunt = {
  coupon: expect.arrayContaining([expect.any(Number)]),
  zip: expect.arrayContaining([expect.any(Number)]),
  menu: expect.arrayContaining([
    expect.objectContaining({
      mealName: expect.any(String),
      price: expect.any(Number),
    }),
  ]),
  address: expect.any(String),
  id: expect.any(String),
  image: expect.any(String),
};
describe('RestrauntService', () => {
  let service: RestrauntService;
  const restrauntRepositoryMock: MockType<Repository<Restraunt>> = {
    create: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            host: 'localhost',
            name: 'yarden',
            port: 5432,
            username: 'postgres',
            password: 'Yb212081046',
            database: 'postgres',
            entities: [Restraunt],
            synchronize: true,
            logging: false,
          }),
        }),
        TypeOrmModule.forFeature([Restraunt]),
      ],
      providers: [RestrauntService],
    }).compile();
    service = module.get<RestrauntService>(RestrauntService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // describe('create restraunt', () => {
  //   it('should create a new restraunt', async () => {
  //     restrauntRepositoryMock.create.mockReturnValue(restrauntObj);
  //     const newCustomer = await service.create(restrauntObj);
  //     expect(newCustomer).toMatchObject(restrauntObj);
  //   });
  // });
  describe('findAll', () => {
    it('should get all restraunts', async () => {
      restrauntRepositoryMock.find.mockReturnValue(restrauntObj);
      const allRestratuns = await service.findAll();
      expect(allRestratuns).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredRestraunt)]),
      );
    });
  });
  describe('findOne', () => {
    it('should get a restraunt menu', async () => {
      const menuItem = {
        mealName: 'Steak',
        price: 100,
      };
      const expected = Object.keys(menuItem);
      restrauntRepositoryMock.findOne.mockReturnValue(menuItem);
      const response = await service.getMenu(
        '67f106ce-1006-4a94-b372-96577d11e498',
      );
      expect(Object.keys(response.menu[0])).toEqual(
        expect.arrayContaining(expected),
      );
    });
  });
  describe('findAll', () => {
    it('should get a restraunt nearby based on zip code', async () => {
      restrauntRepositoryMock.find.mockReturnValue(restrauntObj);
      const response = await service.findBasedOnZipCode(222);
      expect(response).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredRestraunt)]),
      );
    });
  });
});

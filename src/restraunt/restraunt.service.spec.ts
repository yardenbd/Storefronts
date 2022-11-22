import { v4 as uuidv4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem, Restraunt } from './entities/restraunt.entity';
import { RestrauntService } from './restraunt.service';
import { Repository } from 'typeorm';
import { UpdateRestrauntInput } from './dto/update-restraunt.input';
type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
const restrauntId: string = uuidv4();
const restrauntTestId: string = '81eca88a-a730-4785-99cf-97757fd0f151';
const restrauntObj: Restraunt = {
  address: 'Haalisaczxzya 48',
  coupon: [10],
  image: 'https://picsum.photos/200/300',
  id: restrauntId,
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
    remove: jest.fn(),
    update: jest.fn(),
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
  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Create restraunt', () => {
    it('should create a new restraunt', async () => {
      restrauntRepositoryMock.create.mockReturnValue(restrauntObj);
      const newCustomer = await service.create(restrauntObj);
      expect(newCustomer).toMatchObject(restrauntObj);
    });
  });
  describe('Find all', () => {
    it('should get all restraunts', async () => {
      restrauntRepositoryMock.find.mockReturnValue(restrauntObj);
      const allRestratuns = await service.findAll();
      expect(allRestratuns).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredRestraunt)]),
      );
    });
  });
  describe('Find one menu', () => {
    it('should get a restraunt menu', async () => {
      const desiredMenuItem = {
        mealName: expect.any(String),
        price: expect.any(Number),
      };
      restrauntRepositoryMock.findOne.mockReturnValue(desiredMenuItem);
      const response = await service.getMenu(restrauntTestId);
      expect(response.menu).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredMenuItem)]),
      );
    });
  });
  describe('Find all based on zip', () => {
    it('should get a restraunt nearby based on zip code', async () => {
      restrauntRepositoryMock.find.mockReturnValue(restrauntObj);
      const response = await service.findBasedOnZipCode(222);
      expect(response).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredRestraunt)]),
      );
    });
  });
  describe('Find one restraunt', () => {
    it('should get a single restraunt ', async () => {
      restrauntRepositoryMock.findOne.mockReturnValue(restrauntTestId);
      const response = await service.findOne(restrauntTestId);
      expect(response).toMatchObject(desiredRestraunt);
    });
  });
  describe('Update restraunt', () => {
    it('should updates a single restraunt ', async () => {
      restrauntRepositoryMock.update.mockReturnValue(restrauntTestId);
      const updateRestrauntObj: UpdateRestrauntInput = {
        id: restrauntTestId,
        name: 'testname',
        address: 'testaddress',
      };
      const response = await service.update(updateRestrauntObj);
      expect(response).toEqual(expect.objectContaining(updateRestrauntObj));
    });
  });
  describe('Delete restraunt', () => {
    it('should updates a single restraunt ', async () => {
      restrauntRepositoryMock.remove.mockReturnValue(restrauntId);
      const response = await service.remove(restrauntId);
      expect(response).toBeDefined();
    });
  });
});

import { v4 as uuidv4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restraunt } from './entities/restraunt.entity';
import { RestrauntService } from './restraunt.service';
import { Repository } from 'typeorm';
type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
describe('RestrauntService', () => {
  let service: RestrauntService;
  const customerRepositoryMock: MockType<Repository<Restraunt>> = {
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
  describe('create restraunt', () => {
    it('should create a new restraunt', async () => {
      const restrauntDTO: Restraunt = {
        address: 'Haaliya 48',
        coupon: [10],
        image: 'https://picsum.photos/200/300',
        id: uuidv4(),
        name: 'Zesty',
        menu: [
          { mealName: 'Burger', price: 50 },
          { mealName: 'French Fries', price: 30 },
        ],
        zip: [223, 443, 111],
      };

      customerRepositoryMock.create.mockReturnValue(restrauntDTO);
      const newCustomer = await service.create(restrauntDTO);
      expect(newCustomer).toMatchObject(restrauntDTO);
    });
  });
  // describe('findAll', () => {
  //   it('should find all customers', async () => {
  //     customerRepositoryMock.find.mockReturnValue(customers);
  //     const foundCustomers = await service.findAll();
  //     expect(foundCustomers).toContainEqual({
  //       id: '1234',
  //       name: 'John Doe',
  //       email: 'john.doe@email.com',
  //       phone: '3134045867',
  //       address: '123 Road, Springfied, MO',
  //     });
  //     expect(customerRepositoryMock.find).toHaveBeenCalled();
  //   });
  // });
  // describe('findOne', () => {
  //   it('should find a customer', async () => {
  //     const customer = {
  //       id: '1234',
  //       name: 'John Doe',
  //       email: 'john.doe@email.com',
  //       phone: '3134045867',
  //       address: '123 Road, Springfied, MO',
  //     };
  //     customerRepositoryMock.findOne.mockReturnValue(customer);
  //     const foundCustomer = await service.findOne(customer.id);
  //     expect(foundCustomer).toMatchObject(customer);
  //     expect(customerRepositoryMock.findOne).toHaveBeenCalledWith(customer.id);
  //   });
  // });
});

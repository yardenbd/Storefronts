import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { AppModule } from '../src/app.module';

describe('CustomerResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const gql = '/graphql';

  describe('createCustomer', () => {
    it('should get all Storefronts', () => {
      console.log('here');
      return request(app.getHttpServer())
        .post(gql)
        .send({
          pagination:
            'pagination {storefrontFindAll(pagination: { take: 10, skip: 0 }) { id name address image zip coupons menu { mealName price } } } ',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createCustomer).toEqual({
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '145677312965',
            address: '123 Road, Springfied, MO',
          });
        });
    });
  });
});

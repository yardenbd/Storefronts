import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { desiredCreatedStorefront } from '../src/storefront/constants';

describe('CustomerResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const gql = '/graphql';

  const createStorefrontMutation = `mutation {
  createStorefront(
    createStorefrontInput: {
      address: "Tel Aviv"
      coupons: [10, 20, 30]
      image: "https://picsum.photos/200/300"
      name: "BP"
      zip: [222, 333, 444]
      menu: [
        { mealName: "Sushi", price: 70 }
        { mealName: "Nigiri", price: 40 }
        { mealName: "Soup", price: 30 }
        { mealName: "Noodels", price: 60 }
      ]
    }
  ) {
    id
    name
    address
    image
    coupons
    zip
    menu {
      id
      mealName
      price
      storefrontId
    }
  }
}`;

  describe(gql, () => {
    describe('cats', () => {
      it('should get the cats array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({ query: createStorefrontMutation })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createStorefront).toMatchObject(
              desiredCreatedStorefront,
            );
          });
      });
    });
  });
  afterAll(async () => {
    await app.close();
  });
});

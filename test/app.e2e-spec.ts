import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import {
  desiredCreatedStorefront,
  desiredStorefront,
} from '../src/storefront/constants';

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
      address: "Tel Aviv Hahagna 2"
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
  const getAllStorefrontsQuery = `query {
    findAllStorefronts(pagination:{take:5,skip:0})
  {
    id
    name
    image
    address
    coupons
    zip
  }
}`;
  describe(gql, () => {
    describe('Storefront', () => {
      it('should create a new Storefront', () => {
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
      it('should getl all Storefronts', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({ query: getAllStorefrontsQuery })
          .expect(200)
          .expect((res) => {
            console.log('res', res.body.data.findAllStorefronts);
            expect(res.body.data.findAllStorefronts).toEqual(
              expect.arrayContaining([
                expect.objectContaining(desiredStorefront),
              ]),
            );
          });
      });
    });
  });
  afterAll(async () => {
    await app.close();
  });
});

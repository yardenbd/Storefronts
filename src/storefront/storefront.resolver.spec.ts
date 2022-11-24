import { Test, TestingModule } from '@nestjs/testing';
import {
  desiredMenuItem,
  desiredStorefront,
  pagintaionObj,
  storefrontObj,
  storefrontTestId,
} from '../constants';
import { CreateStorefrontInput } from './dto/create-storefront.input';
import { StorefrontResolver } from './storefront.resolver';
import { StorefrontService } from './storefront.service';
import { UpdateStorefrontInput } from './dto/update-storefront.input';

describe('Storefront Resolver', () => {
  let resolver: StorefrontResolver;
  const storefrontServiceMock = {
    create: jest.fn((storefront: CreateStorefrontInput) => storefront),
    findAll: jest.fn(() => [storefrontObj]),
    findOne: jest.fn((id: string) => storefrontObj),
    removeStorefront: jest.fn((id: string) => storefrontObj),
    remove: jest.fn((id: string) => storefrontObj),
    updateStorefront: jest.fn(
      (updateStorefrontObj: UpdateStorefrontInput) => updateStorefrontObj,
    ),
    update: jest.fn(
      (updateStorefrontObj: UpdateStorefrontInput) => updateStorefrontObj,
    ),
    getMenu: jest.fn(() => [desiredMenuItem]),
    findBasedOnZipCode: jest.fn((zip: number) => [storefrontObj]),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorefrontResolver,
        {
          provide: StorefrontService,
          useValue: storefrontServiceMock,
        },
      ],
    }).compile();
    resolver = module.get<StorefrontResolver>(StorefrontResolver);
  });
  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('create', () => {
    it('should create a Stroefront', async () => {
      const storefront = await resolver.createStorefront(storefrontObj);
      expect(storefront).toMatchObject(desiredStorefront);
    });
  });
  describe('Find all Storefronts', () => {
    it('should find and return a list of customers', async () => {
      const allRestratuns = await resolver.findAll(pagintaionObj);
      expect(allRestratuns).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredStorefront)]),
      );
    });
  });
  describe('Find one menu', () => {
    it('should find and return a storefront menu', async () => {
      const response = await resolver.getStorefrontMenu(storefrontObj.id);
      expect(response).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredMenuItem)]),
      );
    });
  });
  describe('Find all based on zip', () => {
    it('should find and return a customer invoice', async () => {
      const response = await resolver.findBasedOnZipCode(4245, pagintaionObj);
      expect(response).toEqual(
        expect.arrayContaining([expect.objectContaining(desiredStorefront)]),
      );
    });
  });
  describe('Find one storefront', () => {
    it('should get a single storefront ', async () => {
      const response = await resolver.findOne(storefrontTestId);
      expect(response).toMatchObject(desiredStorefront);
    });
  });
  describe('Update storefront', () => {
    it('should updates a single storefront ', async () => {
      const updateStorefrontObj: UpdateStorefrontInput = {
        id: storefrontTestId,
        name: 'testname',
        address: 'testaddress',
      };

      const response = await resolver.updateStorefront(updateStorefrontObj);
      expect(response).toEqual(expect.objectContaining(updateStorefrontObj));
    });
  });
  describe('Delete storefront', () => {
    it('should updates a single storefront ', async () => {
      const response = await resolver.removeStorefront(storefrontObj.id);
      expect(response).toMatchObject(desiredStorefront);
    });
  });
});

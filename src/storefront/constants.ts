import { arrayOfNumbersExpectation } from '../constants';
import { OmittedMenuFromStorefront } from '../types';
import { CreateStorefrontInput } from './dto/create-storefront.input';
import { v4 as uuidv4 } from 'uuid';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import { menuItemsExpectations } from '../menu-item/constants';
export const createStorefrontObj: CreateStorefrontInput = {
  address: 'Givaataim',
  coupons: [20, 30, 40],
  image: 'https://picsum.photos/200/300',
  name: 'Japanika',
  menu: [
    { mealName: 'Sushi', price: 70 },
    { mealName: 'Nigiri', price: 40 },
    { mealName: 'Soup', price: 30 },
    { mealName: 'Noodels', price: 60 },
  ],
  zip: [4245, 143, 442, 7751, 523, 662],
};

export const storefrontObj: OmittedMenuFromStorefront = {
  id: uuidv4(),
  address: 'Tel Aviv',
  coupons: [10, 20, 30],
  image: 'https://picsum.photos/200/300',
  name: 'McDonalds',
  zip: [222, 333, 444],
};
const storefrontObj2: OmittedMenuFromStorefront = {
  id: uuidv4(),
  address: 'Ramat Gan',
  image: 'https://picsum.photos/200/300',
  name: 'BP',
  coupons: [15, 25, 35],
  zip: [4245, 143, 234, 7751, 223, 412],
};
const storefrontObj3: OmittedMenuFromStorefront = {
  id: uuidv4(),
  address: 'Givaataim',
  image: 'https://picsum.photos/200/300',
  name: 'Japanika',
  coupons: [20, 30, 40],

  zip: [4245, 143, 442, 7751, 523, 662],
};

export const desiredCreatedStorefront = {
  coupons: arrayOfNumbersExpectation,
  zip: arrayOfNumbersExpectation,
  menu: menuItemsExpectations(false),
  address: expect.any(String),
  image: expect.any(String),
  name: expect.any(String),
};
export const desiredStorefront: OmittedMenuFromStorefront = {
  zip: arrayOfNumbersExpectation,
  address: expect.any(String),
  image: expect.any(String),
  name: expect.any(String),
  id: expect.any(String),
  coupons: arrayOfNumbersExpectation,
};

export const storefrontArray = [storefrontObj, storefrontObj2, storefrontObj3];

export const updateStorefrontObj: UpdateStorefrontInput = {
  id: uuidv4(),
  name: 'testname',
  address: 'testaddress',
};

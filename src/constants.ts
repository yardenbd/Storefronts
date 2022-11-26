import { v4 as uuidv4 } from 'uuid';
import { MenuItem } from './menu-item/entities/menu-item.entity';
import { CreateOrderInput } from './orders/dto/create-order.input';

import { OrderInformation } from './orders/entities/calcOrder.entity';
import { CreateStorefrontInput } from './storefront/dto/create-storefront.input';
import { UpdateStorefrontInput } from './storefront/dto/update-storefront.input';
import { OmittedMenuFromStorefront, Pagination } from './types';
export const storefrontTestId = '81eca88a-a730-4785-99cf-97757fd0f151';

export const arrayOfNumbersExpectation = expect.arrayContaining([
  expect.any(Number),
]);
export const desiredMenuItem = {
  id: expect.any(String),
  mealName: expect.any(String),
  price: expect.any(Number),
};
export const desiredCreatedMenuItem = {
  mealName: expect.any(String),
  price: expect.any(Number),
};
const menuItemsExpectations = (shouldReturnId: boolean) => {
  return expect.arrayContaining([
    expect.objectContaining(
      shouldReturnId ? desiredMenuItem : desiredCreatedMenuItem,
    ),
  ]);
};
export const menu: Omit<MenuItem, 'storefront' | 'orderDetail'>[] = [
  { id: uuidv4(), mealName: 'Sushi', price: 70 },
  { id: uuidv4(), mealName: 'Nigiri', price: 40 },
  { id: uuidv4(), mealName: 'Soup', price: 30 },
  { id: uuidv4(), mealName: 'Noodels', price: 60 },
];
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
export const orderObject: CreateOrderInput & { id: string } = {
  id: uuidv4(),
  customerAddress: 'Tel Aviv',
  customerName: 'Yarden Ben Dahan',
  lineItems: menu,
  coupons: [10, 20],
};

export const desiredOrder: CreateOrderInput = {
  customerAddress: expect.any(String),
  customerName: expect.any(String),
  lineItems: menuItemsExpectations(true),
  coupons: arrayOfNumbersExpectation,
};

export const calcOrderObj = {
  coupons: [10, 20],
  totalPrice: 180,
  menuItems: [
    { mealName: 'Sushi', price: 70, quantity: 2 },
    { mealName: 'Nigiri', price: 40, quantity: 1 },
    { mealName: 'Soup', price: 30, quantity: 1 },
  ],
};

export const desiredLineItem = {
  mealName: expect.any(String),
  price: expect.any(Number),
};

export const desiredCalcOrder: OrderInformation = {
  coupons: expect.arrayContaining(expect.any(Number)),
  totalPrice: expect.any(Number),
  menuItems: expect.arrayContaining([
    expect.objectContaining({
      mealName: expect.any(String),
      price: expect.any(Number),
      quantity: expect.any(Number),
    }),
  ]),
};
export const storefrontArray = [storefrontObj, storefrontObj2, storefrontObj3];

export const pagintaionObj: Pagination = { skip: 0, take: 10 };

export const updateStorefrontObj: UpdateStorefrontInput = {
  id: storefrontTestId,
  name: 'testname',
  address: 'testaddress',
};

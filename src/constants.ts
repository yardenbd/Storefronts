import { v4 as uuidv4 } from 'uuid';
import { Coupon } from './copoun/entities/coupon.entity';
import { MenuItem } from './menu-item/entities/menu-item.entity';
import { CreateOrderInput } from './orders/dto/create-order.input';

import { CalcOrder } from './orders/entities/calcOrder.entity';
import { Orders } from './orders/entities/order.entity';
import { CreateStorefrontInput } from './storefront/dto/create-storefront.input';
import { UpdateStorefrontInput } from './storefront/dto/update-storefront.input';
import { Storefront } from './storefront/entities/storefront.entity';
import { Pagination } from './types';
export const storefrontTestId = '81eca88a-a730-4785-99cf-97757fd0f151';

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
  coupon: [{ discount: 20 }, { discount: 30 }, { discount: 40 }],
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

export const storefrontObj: Partial<Storefront> = {
  address: 'Tel Aviv',
  image: 'https://picsum.photos/200/300',
  name: 'McDonalds',
  zip: [222, 333, 444],
  id: uuidv4(),
};
const storefrontObj2: Partial<Storefront> = {
  address: 'Ramat Gan',
  image: 'https://picsum.photos/200/300',
  name: 'BP',
  id: uuidv4(),
  zip: [4245, 143, 234, 7751, 223, 412],
};
const storefrontObj3: Partial<Storefront> = {
  address: 'Givaataim',
  image: 'https://picsum.photos/200/300',
  name: 'Japanika',
  zip: [4245, 143, 442, 7751, 523, 662],
  id: uuidv4(),
};

const desiredCoupons: Partial<Coupon> = {
  discount: expect.any(Number),
};
export const desiredCreatedStorefront = {
  coupon: expect.arrayContaining([expect.objectContaining(desiredCoupons)]),
  zip: expect.arrayContaining([expect.any(Number)]),
  menu: menuItemsExpectations(false),
  address: expect.any(String),
  image: expect.any(String),
  name: expect.any(String),
};
export const desiredStorefront = {
  zip: expect.arrayContaining([expect.any(Number)]),
  address: expect.any(String),
  image: expect.any(String),
  name: expect.any(String),
  id: expect.any(String),
};
export const orderObject: CreateOrderInput = {
  customerAddress: 'Tel Aviv',
  customerName: 'Yarden Ben Dahan',
  lineItems: menu,
  coupons: [{ discount: 10 }, { discount: 20 }],
};

export const desiredOrder: CreateOrderInput = {
  customerAddress: expect.any(String),
  customerName: expect.any(String),
  lineItems: menuItemsExpectations(true),
  coupons: expect.arrayContaining([
    expect.objectContaining({ discount: expect.any(Number) }),
  ]),
};

export const desiredLineItem = {
  mealName: expect.any(String),
  price: expect.any(Number),
};

export const desiredCalcDetails: CalcOrder = {
  id: expect.any(String),
  coupons: expect.arrayContaining([
    expect.objectContaining({ discount: expect.any(Number) }),
  ]),
  price: expect.any(Number),
  quantity: expect.any(Number),
};
export const storefrontArray = [storefrontObj, storefrontObj2, storefrontObj3];

export const pagintaionObj: Pagination = { skip: 0, take: 10 };

export const updateStorefrontObj: UpdateStorefrontInput = {
  id: storefrontTestId,
  name: 'testname',
  address: 'testaddress',
};

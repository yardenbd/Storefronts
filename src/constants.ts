import { v4 as uuidv4 } from 'uuid';
import { CreateOrderInput } from './orders/dto/create-order.input';
import { Restraunt } from './restraunt/entities/restraunt.entity';
export const restrauntTestId = '81eca88a-a730-4785-99cf-97757fd0f151';
export const restrauntObj: Restraunt = {
  address: 'Tel Aviv',
  coupons: [10, 20, 30],
  image: 'https://picsum.photos/200/300',
  id: uuidv4(),
  name: 'McDonalds',
  menu: [
    { mealName: 'Burger', price: 50 },
    { mealName: 'Fries', price: 30 },
    { mealName: 'Chips', price: 30 },
    { mealName: 'Big America', price: 60 },
  ],
  zip: [223, 143, 111, 546, 982, 412],
};
const restrauntObj2: Restraunt = {
  address: 'Ramat Gan',
  coupons: [20, 30, 40],
  image: 'https://picsum.photos/200/300',
  id: uuidv4(),
  name: 'BP',
  menu: [
    { mealName: 'Steak', price: 100 },
    { mealName: 'Fish', price: 80 },
    { mealName: 'Rice', price: 50 },
    { mealName: 'Chicken Wings', price: 60 },
  ],
  zip: [4245, 143, 234, 7751, 223, 412],
};
const restrauntObj3: Restraunt = {
  address: 'Givaataim',
  coupons: [15, 25, 35],
  image: 'https://picsum.photos/200/300',
  id: uuidv4(),
  name: 'Japanika',
  menu: [
    { mealName: 'Sushi', price: 70 },
    { mealName: 'Nigiri', price: 40 },
    { mealName: 'Soup', price: 30 },
    { mealName: 'Noodels', price: 60 },
  ],
  zip: [4245, 143, 442, 7751, 523, 662],
};

export const orderObject: CreateOrderInput = {
  customerAddress: 'Tel Aviv',
  customerName: 'Yarden',
  lineItems: [
    { mealName: 'Sushi', price: 70 },
    { mealName: 'Nigiri', price: 40 },
    { mealName: 'Noodels', price: 60 },
  ],
  coupons: [10, 20],
};
export const desiredMenuItem = {
  mealName: expect.any(String),
  price: expect.any(Number),
};
const menuItemsExpectations = expect.arrayContaining([
  expect.objectContaining(desiredMenuItem),
]);
export const desiredOrder: CreateOrderInput = {
  customerAddress: expect.any(String),
  customerName: expect.any(String),
  lineItems: menuItemsExpectations,
  coupons: [10, 20],
};
export const storefrontArray = [restrauntObj, restrauntObj2, restrauntObj3];

export const desiredRestraunt = {
  coupons: expect.arrayContaining([expect.any(Number)]),
  zip: expect.arrayContaining([expect.any(Number)]),
  menu: menuItemsExpectations,
  address: expect.any(String),
  id: expect.any(String),
  image: expect.any(String),
};

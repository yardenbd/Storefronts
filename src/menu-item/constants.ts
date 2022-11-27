import { v4 as uuidv4 } from 'uuid';
import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';
export const desiredMenuItem = {
  id: expect.any(String),
  mealName: expect.any(String),
  price: expect.any(Number),
  storefrontId: expect.any(String),
};

export const desiredCreatedMenuItem = {
  mealName: expect.any(String),
  price: expect.any(Number),
  storefrontId: expect.any(String),
};

export const menuItemsExpectations = expect.arrayContaining([
  expect.objectContaining(desiredMenuItem),
]);

export const menuItems = [
  { id: uuidv4(), storefrontId: uuidv4(), mealName: 'Sushi', price: 70 },
  { id: uuidv4(), storefrontId: uuidv4(), mealName: 'Nigiri', price: 40 },
  { id: uuidv4(), storefrontId: uuidv4(), mealName: 'Soup', price: 30 },
  { id: uuidv4(), storefrontId: uuidv4(), mealName: 'Noodels', price: 60 },
];

export const createMenuItemObj: CreateMenuItemInput = {
  mealName: 'Sinta',
  price: 100,
  storefrontId: uuidv4(),
};

export const menuItemObj = {
  id: uuidv4(),
  ...createMenuItemObj,
};

export const updatedMenuItem: UpdateMenuItemInput = {
  id: uuidv4(),
  mealName: 'Chicken',
  price: 70,
};

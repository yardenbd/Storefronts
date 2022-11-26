import { MenuItem } from './entities/menu-item.entity';
import { v4 as uuidv4 } from 'uuid';
export const desiredMenuItem = {
  id: expect.any(String),
  mealName: expect.any(String),
  price: expect.any(Number),
};
export const desiredCreatedMenuItem = {
  mealName: expect.any(String),
  price: expect.any(Number),
};
export const menuItemsExpectations = (shouldReturnId: boolean) => {
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

export const desiredLineItem = {
  mealName: expect.any(String),
  price: expect.any(Number),
};

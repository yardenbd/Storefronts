import { v4 as uuidv4 } from 'uuid';
import { Restraunt } from './restraunt/entities/restraunt.entity';
export const restrauntId: string = uuidv4();
export const restrauntTestId: string = '81eca88a-a730-4785-99cf-97757fd0f151';
export const restrauntObj: Restraunt = {
  address: 'yay 48',
  coupon: [10, 4, 5],
  image: 'https://picsum.photos/200/300',
  id: restrauntId,
  name: 'yayyyyyyyyyyyyyyy',
  menu: [
    { mealName: 'adsa', price: 50 },
    { mealName: 'zxc Fries', price: 30 },
  ],
  zip: [223, 1, 111],
};
export const desiredRestraunt = {
  coupon: expect.arrayContaining([expect.any(Number)]),
  zip: expect.arrayContaining([expect.any(Number)]),
  menu: expect.arrayContaining([
    expect.objectContaining({
      mealName: expect.any(String),
      price: expect.any(Number),
    }),
  ]),
  address: expect.any(String),
  id: expect.any(String),
  image: expect.any(String),
};
export const desiredMenuItem = {
  mealName: expect.any(String),
  price: expect.any(Number),
};

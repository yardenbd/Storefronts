import { CreateOrderInput } from './dto/create-order.input';
import { v4 as uuidv4 } from 'uuid';
import { arrayOfNumbersExpectation } from '../constants';
import { OrderInformation } from './entities/calcOrder.entity';
import { menuItems, menuItemsExpectations } from '../menu-item/constants';
export const orderObject: CreateOrderInput & { id: string } = {
  id: uuidv4(),
  customerAddress: 'Tel Aviv',
  customerName: 'Yarden Ben Dahan',
  lineItems: menuItems,
  coupons: [10, 20],
};

export const desiredOrder: CreateOrderInput = {
  customerAddress: expect.any(String),
  customerName: expect.any(String),
  lineItems: menuItemsExpectations,
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

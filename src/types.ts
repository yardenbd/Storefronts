import { CreateOrderInput } from './orders/dto/create-order.input';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export interface ILineItems {
  mealName: string;
  quantity: number;
  price: number;
}

type OmmitedCreateOrderInput = Omit<CreateOrderInput, 'lineItems'>;
export interface IOrderInput extends OmmitedCreateOrderInput {
  totalPrice: number;
  lineItems: ILineItems[];
}

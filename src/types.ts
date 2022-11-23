import { CreateOrderInput } from './orders/dto/create-order.input';

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

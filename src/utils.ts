import { DetailsInput } from './orders/entities/orderDetail.entity';
import { ITotalOrder } from './types';

export const calcTotalMealsQuantity = (orderDetail: DetailsInput[]) => {
  let counter = {};

  orderDetail.forEach((meal) => {
    const key = JSON.stringify(meal);
    counter[key] = (counter[key] || 0) + 1;
  });
  return counter;
};

export const calcOrderPrice = (
  coupons: number[] = [],
  orderDetail: DetailsInput[],
) => {
  const totalPriceBeforeCoupons: number = orderDetail
    .map((meal) => meal.price)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  const couponsTotalPrice = coupons.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );
  return totalPriceBeforeCoupons - couponsTotalPrice;
};

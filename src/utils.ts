import { Coupon } from './copoun/entities/coupon.entity';
import { CalcOrder } from './orders/entities/calcOrder.entity';
import { OrderDetailsInput } from './orders/entities/orderDetail.entity';
import { ITotalOrder } from './types';

export const calcTotalMealsQuantity = (orderDetail: OrderDetailsInput[]) => {
  let counter = {};

  orderDetail
    .map((order) => order.mealName)
    .forEach((meal) => {
      counter[meal] = (counter[meal] || 0) + 1;
    });
  return counter;
};

export const removeDuplications = (
  duplicatedItemsArray: OrderDetailsInput[],
) => {
  const unduplicatedItems: OrderDetailsInput[] = [];

  duplicatedItemsArray.forEach((meal) => {
    const isDuplicate = unduplicatedItems.find(
      (unduplicatedMeal) => unduplicatedMeal.id === meal.id,
    );

    if (!isDuplicate) {
      unduplicatedItems.push(meal);

      return true;
    }

    return false;
  });
  return unduplicatedItems;
};

export const calcOrderPrice = (
  coupons: number[] = [],
  orderDetail: OrderDetailsInput[],
) => {
  const totalPriceBeforeCoupons: number = orderDetail
    .map((meal) => meal.price)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const couponsTotalPrice: number = coupons.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return totalPriceBeforeCoupons - couponsTotalPrice;
};

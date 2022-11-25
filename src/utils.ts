import { DetailsInput } from './orders/entities/orderDetail.entity';
import { ITotalOrder } from './types';

export const calcTotalMealsQuantity = (orderDetail: DetailsInput[]) => {
  let counter = {};

  orderDetail
    .map((order) => order.mealName)
    .forEach((meal) => {
      counter[meal] = (counter[meal] || 0) + 1;
    });
  return counter;
};

export const removeMealDuplication = (orderDetails: DetailsInput[]) => {
  const unduplicatedItems: DetailsInput[] = [];

  const unique = orderDetails.filter((meal) => {
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

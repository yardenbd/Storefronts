import { Coupon } from './copoun/entities/coupon.entity';
import { CalcOrder } from './orders/entities/calcOrder.entity';
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

export const removeDuplications = (duplicatedItemsArray: DetailsInput[]) => {
  const unduplicatedItems: DetailsInput[] = [];

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
  coupons: Pick<Coupon, 'discount'>[] = [],
  orderDetail: number[],
) => {
  const totalPriceBeforeCoupons: number = orderDetail.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );
  const couponsTotalPrice: number = coupons
    .map((coupon) => coupon.discount)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  return totalPriceBeforeCoupons - couponsTotalPrice;
};

import { DetailsInput } from './orders/entities/orderDetail.entity';
import { ITotalOrder } from './types';

export const calcTotalMealsQuantity = (orderDetail: DetailsInput[]) => {
  const totalMeals: ITotalOrder[] = [];
  orderDetail.forEach((currentMeal) => {
    const alreadyInTotalMeals = totalMeals.find(
      (meal) => meal.mealName === currentMeal.mealName,
    );
    if (alreadyInTotalMeals) {
      alreadyInTotalMeals.quantity++;
      return;
    }
    totalMeals.push({
      mealName: currentMeal.mealName,
      quantity: 1,
      price: currentMeal.price,
    });
  });
  return totalMeals;
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

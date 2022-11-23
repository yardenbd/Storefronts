import { LineItemsInput } from './orders/entities/order.entity';
import { ILineItems } from './types';

export const calcTotalMealsQuantity = (lineItems: LineItemsInput[]) => {
  const totalMeals: ILineItems[] = [];
  lineItems.forEach((currentMeal) => {
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
  lineItems: LineItemsInput[],
) => {
  const totalPriceBeforeCoupons: number = lineItems
    .map((meal) => meal.price)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  const couponsTotalPrice = coupons.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );
  return totalPriceBeforeCoupons - couponsTotalPrice;
};

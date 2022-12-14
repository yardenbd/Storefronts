import { Pagination } from './types';

export const arrayOfNumbersExpectation = expect.arrayContaining([
  expect.any(Number),
]);

export const pagintaionObj: Pagination = { skip: 0, take: 10 };

export const desiredDeletedObj = { raw: [], affected: expect.any(Number) };

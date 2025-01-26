import { isBefore } from 'date-fns';

export const isBeforeUtils = (dateToCompare: Date, date: Date): boolean => {
  return isBefore(dateToCompare, date);
}
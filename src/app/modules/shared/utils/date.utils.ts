import { addDays, format, isBefore } from 'date-fns';

export const isBeforeUtils = (dateToCompare: Date, date: Date): boolean => {
  return isBefore(dateToCompare, date);
}

export const formatUtils = (date: Date): string => {
  return format(date, 'MM/dd/yyyy');
}

export const addDaysUtils = (date: Date, numberDaysToAdd: number): string => {
  return formatUtils(addDays(date, numberDaysToAdd));
}
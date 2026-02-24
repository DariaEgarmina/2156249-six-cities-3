import { CITIES } from '@/const';

export const isProperCity = (city: string): city is (typeof CITIES)[number] =>
  CITIES.some((validCity) => validCity === city);

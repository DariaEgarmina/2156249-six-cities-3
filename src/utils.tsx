import { Offer } from './types/offer';
import { SortType } from './types/sort';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

export const sortOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  const sorted = [...offers];

  switch (sortType) {
    case 'Popular':
      return sorted;
    case 'PriceLowToHigh':
      return sorted.sort((a, b) => a.price - b.price);
    case 'PriceHighToLow':
      return sorted.sort((a, b) => b.price - a.price);
    case 'TopRated':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};

export const formatType = (type: string): string => {
  const firstLetter = type.charAt(0).toUpperCase();
  const rest = type.slice(1);
  return firstLetter + rest;
};

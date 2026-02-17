import { Offer } from '@/types/offer';

export const groupByCity = (offers: Offer[]): Record<string, Offer[]> =>
  offers.reduce(
    (acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    },
    {} as Record<string, Offer[]>,
  );

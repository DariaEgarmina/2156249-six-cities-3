import { CITIES } from '@/const';
import { Offer } from '@/types/offer';
import { SortType } from '@/types/sort';

export type OffersState = {
  city: (typeof CITIES)[number];
  offers: Offer[];
  activeSort: SortType;
  selectedOfferId: string | null;
  isLoading: boolean;
  error: string | null;
};

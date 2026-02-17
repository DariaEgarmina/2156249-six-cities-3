import { Offer } from '@/types/offer';

export type FavoritesState = {
  favorites: Offer[];
  isLoading: boolean;
  favoritesError: string | null;
  favoritesToastError: string | null;
};

export type ChangeFavoriteStatusPayload = {
  offerId: string;
  status: number;
};

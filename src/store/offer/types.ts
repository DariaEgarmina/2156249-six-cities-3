import { FullOffer, Offer } from '@/types/offer';

export type OfferState = {
  offer: FullOffer | null;
  nearbyOffers: Offer[];
  isLoading: boolean;
  error: string | null;
  nearbyLoadError: string | null;
  nearbyToastError: string | null;
};

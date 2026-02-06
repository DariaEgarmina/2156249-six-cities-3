import { State } from '@/store';
import { NameSpace } from '@/const';

export const getOffer = (state: State) => state[NameSpace.Offer].offer;
export const getNearbyOffers = (state: State) =>
  state[NameSpace.Offer].nearbyOffers.slice(0, 3);
export const getIsOfferLoading = (state: State) =>
  state[NameSpace.Offer].isLoading;
export const getOfferError = (state: State) => state[NameSpace.Offer].error;
export const getNearbyLoadError = (state: State) => state[NameSpace.Offer].nearbyLoadError;
export const getNearbyToastError = (state: State) => state[NameSpace.Offer].nearbyToastError;

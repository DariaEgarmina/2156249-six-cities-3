import { State } from '@/store';
import { NameSpace } from '@/const';

export const getOffer = (state: State) => state[NameSpace.Offer].offer;
export const getNearbyOffers = (state: State) =>
  state[NameSpace.Offer].nearbyOffers;
export const getIsOfferLoading = (state: State) =>
  state[NameSpace.Offer].isLoading;
export const getOfferError = (state: State) => state[NameSpace.Offer].error;

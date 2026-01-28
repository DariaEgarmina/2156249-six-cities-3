import { State } from '..';
import { NameSpace } from '@/const';

export const getOffers = (state: State) => state[NameSpace.Offers].offers;

export const getCity = (state: State) => state[NameSpace.Offers].city;

export const getActiveSort = (state: State) => state[NameSpace.Offers].activeSort;

export const getSelectedOfferId = (state: State) =>
  state[NameSpace.Offers].selectedOfferId;

export const getOffersLoadingStatus = (state: State) =>
  state[NameSpace.Offers].isLoading;

export const getError = (state: State) => state[NameSpace.Offers].error;

import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer';
import { Review } from '@/types/review';
import {
  loadOffers,
  requireAuthorization,
  setError,
  setOffersDataLoadingStatus,
} from './actions';
import { reviews } from '@/mocks/reviews';
import { CITIES, AuthorizationStatus } from '@/const';
import { SortType } from '@/types/sort';

type State = {
  city: (typeof CITIES)[number];
  offers: Offer[];
  reviews: Review[];
  activeSort: SortType;
  selectedOfferId: string | null;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
};

const initialState: State = {
  city: CITIES[0],
  offers: [],
  reviews,
  activeSort: 'Popular',
  selectedOfferId: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };

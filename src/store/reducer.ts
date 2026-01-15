import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer';
import { Review } from '@/types/review';
import {
  setCity,
  setActiveSort,
  setSelectedOfferId,
  loadOffers,
  requireAuthorization,
} from './actions';
import { offers } from '@/mocks/offers';
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
};

const initialState: State = {
  city: CITIES[0],
  offers,
  reviews,
  activeSort: 'Popular',
  selectedOfferId: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setActiveSort, (state, action) => {
      state.activeSort = action.payload;
    })
    .addCase(setSelectedOfferId, (state, action) => {
      state.selectedOfferId = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export { reducer };

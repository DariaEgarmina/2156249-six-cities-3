import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer';
import { Review } from '@/types/review';
import { setCity, setActiveSort, setSelectedOfferId } from './actions';
import { offers } from '@/mocks/offers';
import { reviews } from '@/mocks/reviews';
import { CITIES } from '@/const';
import { SortType } from '@/types/sort';

type State = {
  city: (typeof CITIES)[number];
  offers: Offer[];
  reviews: Review[];
  activeSort: SortType;
  selectedOfferId: string | null;
};

const initialState: State = {
  city: CITIES[0],
  offers,
  reviews,
  activeSort: 'Popular',
  selectedOfferId: null,
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
    });
});

export { reducer };

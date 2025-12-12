import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer';
import { setCity, setActiveSort } from './actions';
import { offers } from '@/mocks/offers';
import { CITIES } from '@/const';
import { SortType } from '@/types/sort';

type State = {
  city: typeof CITIES[number];
  offers: Offer[];
  activeSort: SortType;
};

const initialState: State = {
  city: CITIES[0],
  offers,
  activeSort: 'Popular',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setActiveSort, (state, action) => {
      state.activeSort = action.payload;
    });
});

export { reducer };

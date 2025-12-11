import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer';
import { setCity } from './actions';
import { offers } from '@/mocks/offers';
import { CITIES } from '@/const';

type State = {
  city: typeof CITIES[number];
  offers: Offer[];
};

const initialState: State = {
  city: CITIES[0],
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    });
});

export { reducer };

import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '@/types/offer';
import { setCity, uploadOffers } from './actions';
import { offers } from '@/mocks/offers';

type State = {
  city: string;
  offers: Offer[];
};

const initialState: State = {
  city: 'Paris',
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(uploadOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };

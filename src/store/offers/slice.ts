import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES } from '@/const';
import { OffersState } from './types';
import { NameSpace } from '@/const';
import { SortType } from '@/types/sort';
import { Offer } from '@/types/offer';
import { fetchOffersAction } from './api-actions';
import { changeFavoriteStatusAction } from '@/store/favorites';

const initialState: OffersState = {
  city: CITIES[0],
  offers: [],
  activeSort: 'Popular',
  selectedOfferId: null,
  isLoading: false,
  error: null,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<(typeof CITIES)[number]>) => {
      state.city = action.payload;
    },
    setActiveSort: (state, action: PayloadAction<SortType>) => {
      state.activeSort = action.payload;
    },
    setSelectedOfferId: (state, action: PayloadAction<string | null>) => {
      state.selectedOfferId = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOffersAction.fulfilled,
        (state, action: PayloadAction<Offer[]>) => {
          state.offers = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось загрузить предложения';
      })
      .addCase(
        changeFavoriteStatusAction.fulfilled,
        (state, action: PayloadAction<Offer>) => {
          const updatedOffer = action.payload;
          const index = state.offers.findIndex(
            (offer) => offer.id === updatedOffer.id,
          );
          if (index !== -1) {
            state.offers[index] = updatedOffer;
          }
        },
      );
  },
});

export const { setCity, setActiveSort, setSelectedOfferId, clearError } =
  offersSlice.actions;
export default offersSlice.reducer;

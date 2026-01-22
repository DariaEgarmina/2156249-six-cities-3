import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES } from '@/const';
import { OffersState } from './types';
import { NameSpace } from '@/const';
import { SortType } from '@/types/sort';
import { fetchOffersAction } from './api-actions';

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload; // action.payload = Offer[]
        state.isLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось загрузить предложения';
      });
  },
});

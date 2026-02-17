import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferState } from './types';
import { NameSpace } from '@/const';
import { fetchOfferAction, fetchNearbyOffersAction } from './api-actions';
import { FullOffer, Offer } from '@/types/offer';
import { changeFavoriteStatusAction } from '@/store/favorites';

const initialState: OfferState = {
  offer: null,
  nearbyOffers: [],
  isLoading: false,
  error: null,
  nearbyLoadError: null,
  nearbyToastError: null,
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    clearOffer: (state) => {
      state.offer = null;
      state.nearbyOffers = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    clearNearbyLoadError: (state) => {
      state.nearbyLoadError = null;
    },
    clearNearbyToastError: (state) => {
      state.nearbyToastError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.nearbyOffers = [];
        state.nearbyLoadError = null;
        state.nearbyToastError = null;
      })
      .addCase(
        fetchOfferAction.fulfilled,
        (state, action: PayloadAction<FullOffer>) => {
          state.offer = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load offer';
      })
      .addCase(
        fetchNearbyOffersAction.fulfilled,
        (state, action: PayloadAction<Offer[]>) => {
          state.nearbyOffers = action.payload;
        },
      )
      .addCase(fetchNearbyOffersAction.rejected, (state, action) => {
        state.nearbyLoadError =
          action.error.message || 'Failed to load nearby places';
        state.nearbyToastError =
          action.error.message || 'Failed to load nearby places';
      })
      .addCase(
        changeFavoriteStatusAction.fulfilled,
        (state, action: PayloadAction<Offer>) => {
          const updatedOffer = action.payload;

          if (state.offer?.id === updatedOffer.id && state.offer) {
            state.offer.isFavorite = updatedOffer.isFavorite;
          }

          const nearbyIndex = state.nearbyOffers.findIndex(
            (nearbyOffer) => nearbyOffer.id === updatedOffer.id,
          );
          if (nearbyIndex !== -1) {
            state.nearbyOffers[nearbyIndex] = updatedOffer;
          }
        },
      );
  },
});

export const {
  clearOffer,
  clearError,
  clearNearbyLoadError,
  clearNearbyToastError,
} = offerSlice.actions;
export default offerSlice.reducer;

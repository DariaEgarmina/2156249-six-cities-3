import { OfferState } from './types';
import {
  offerSlice,
  clearOffer,
  clearError,
  clearNearbyLoadError,
  clearNearbyToastError,
} from './slice';
import { makeFakeFullOffer, makeFakeOffers } from '@/mocks';

describe('offerSlice', () => {
  const initialState: OfferState = {
    offer: null,
    nearbyOffers: [],
    isLoading: false,
    error: null,
    nearbyLoadError: null,
    nearbyToastError: null,
  };

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = offerSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return same state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offerSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should reset offer and nearbyOffers with "clearOffer" action', () => {
      const stateWithData = {
        ...initialState,
        offer: makeFakeFullOffer('1'),
        nearbyOffers: makeFakeOffers(1),
      };

      const result = offerSlice.reducer(stateWithData, clearOffer());

      expect(result.offer).toBeNull();
      expect(result.nearbyOffers).toEqual([]);
    });

    it('should clear error with "clearError" action', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error',
      };

      const result = offerSlice.reducer(stateWithError, clearError());

      expect(result.error).toBeNull();
    });

    it('should clear nearbyLoadError with "clearNearbyLoadError" action', () => {
      const stateWithError = {
        ...initialState,
        nearbyLoadError: 'Some nearby error',
      };

      const result = offerSlice.reducer(stateWithError, clearNearbyLoadError());

      expect(result.nearbyLoadError).toBeNull();
    });

    it('should clear nearbyToastError with "clearNearbyToastError" action', () => {
      const stateWithError = {
        ...initialState,
        nearbyToastError: 'Some toast error',
      };

      const result = offerSlice.reducer(
        stateWithError,
        clearNearbyToastError(),
      );

      expect(result.nearbyToastError).toBeNull();
    });
  });
});

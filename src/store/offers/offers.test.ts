import {
  offersSlice,
  setCity,
  setActiveSort,
  setSelectedOfferId,
  clearError,
} from './slice';
import { CITIES } from '@/const';
import { OffersState } from './types';
import { fetchOffersAction } from './api-actions';
import { changeFavoriteStatusAction } from '../favorites';
import { makeFakeOffer, makeFakeOffers } from '@/utils/mocks';

describe('offersSlice', () => {
  const initialState: OffersState = {
    city: CITIES[0],
    offers: [],
    activeSort: 'Popular',
    selectedOfferId: null,
    isLoading: false,
    error: null,
  };

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = offersSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return same state with empty action', () => {
    const emptyAction = { type: '' };
    const result = offersSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should change city with "setCity" action', () => {
      const newCity = CITIES[1];
      const action = setCity(newCity);
      const result = offersSlice.reducer(initialState, action);

      expect(result.city).toBe(newCity);
      expect(result.offers).toEqual([]);
    });

    it('should change sort type with "setActiveSort" action', () => {
      const newSort = 'PriceLowToHigh';
      const action = setActiveSort(newSort);
      const result = offersSlice.reducer(initialState, action);

      expect(result.activeSort).toBe(newSort);
    });

    it('should set offer id with "setSelectedOfferId" action', () => {
      const offerId = '123';
      const action = setSelectedOfferId(offerId);
      const result = offersSlice.reducer(initialState, action);

      expect(result.selectedOfferId).toBe(offerId);
    });

    it('should set null with "setSelectedOfferId" action', () => {
      const action = setSelectedOfferId(null);
      const result = offersSlice.reducer(initialState, action);

      expect(result.selectedOfferId).toBeNull();
    });

    it('should reset error with "clearError" action', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error',
      };
      const action = clearError();
      const result = offersSlice.reducer(stateWithError, action);

      expect(result.error).toBeNull();
    });
  });

  describe('extra reducers', () => {
    it('should set isLoading to true and clear error with "fetchOffersAction.pending" action', () => {
      const action = { type: fetchOffersAction.pending.type };
      const result = offersSlice.reducer(initialState, action);

      expect(result.isLoading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set offers and stop loading with "fetchOffersAction.fulfilled" action', () => {
      const mockOffers = makeFakeOffers(2);
      const action = {
        type: fetchOffersAction.fulfilled.type,
        payload: mockOffers,
      };
      const result = offersSlice.reducer(initialState, action);

      expect(result.offers).toEqual(mockOffers);
      expect(result.isLoading).toBe(false);
      expect(result.error).toBeNull();
    });

    it('should set error and stop loading with "fetchOffersAction.rejected" action', () => {
      const errorMessage = 'Network error';
      const action = {
        type: fetchOffersAction.rejected.type,
        error: { message: errorMessage },
      };
      const result = offersSlice.reducer(initialState, action);

      expect(result.isLoading).toBe(false);
      expect(result.error).toBe(errorMessage);
    });

    it('should update offer in list with "changeFavoriteStatusAction.fulfilled" action', () => {
      const mockOffers = makeFakeOffers(2);

      const stateWithOffers = {
        ...initialState,
        offers: mockOffers,
      };

      const updatedOffer = { ...makeFakeOffer('1'), isFavorite: true };
      const action = {
        type: changeFavoriteStatusAction.fulfilled.type,
        payload: updatedOffer,
      };

      const result = offersSlice.reducer(stateWithOffers, action);

      expect(result.offers[0].isFavorite).toBe(true);
      expect(result.offers[1].isFavorite).toBe(false);
    });

    it('should not change state if offer not found with "changeFavoriteStatusAction.fulfilled" action', () => {
      const mockOffers = makeFakeOffers(1);

      const stateWithOffers = {
        ...initialState,
        offers: mockOffers,
      };

      const updatedOffer = { ...makeFakeOffer('999'), isFavorite: true };
      const action = {
        type: changeFavoriteStatusAction.fulfilled.type,
        payload: updatedOffer,
      };

      const result = offersSlice.reducer(stateWithOffers, action);

      expect(result.offers).toEqual(mockOffers);
    });
  });
});

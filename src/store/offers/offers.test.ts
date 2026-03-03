import {
  offersSlice,
  setCity,
  setActiveSort,
  setSelectedOfferId,
  clearError,
} from './slice';
import { CITIES } from '@/const';
import { OffersState } from './types';

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
});

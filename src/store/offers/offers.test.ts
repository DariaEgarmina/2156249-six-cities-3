import { offersSlice } from './slice';
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
});

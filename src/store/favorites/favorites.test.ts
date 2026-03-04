import {
  favoritesSlice,
  clearFavoritesError,
  clearFavoritesToastError,
} from './slice';

describe('favoritesSlice', () => {
  const initialState = {
    favorites: [],
    isLoading: false,
    favoritesError: null,
    favoritesToastError: null,
  };

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = favoritesSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return same state with empty action', () => {
    const emptyAction = { type: '' };
    const result = favoritesSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should clear favoritesError with "clearFavoritesError" action', () => {
      const stateWithError = {
        ...initialState,
        favoritesError: 'Some error',
      };

      const result = favoritesSlice.reducer(
        stateWithError,
        clearFavoritesError(),
      );

      expect(result.favoritesError).toBeNull();
    });

    it('should clear favoritesToastError with "clearFavoritesToastError" action', () => {
      const stateWithError = {
        ...initialState,
        favoritesToastError: 'Some toast error',
      };

      const result = favoritesSlice.reducer(
        stateWithError,
        clearFavoritesToastError(),
      );

      expect(result.favoritesToastError).toBeNull();
    });
  });
});

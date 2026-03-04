import {
  favoritesSlice,
  clearFavoritesError,
  clearFavoritesToastError,
} from './slice';
import { FavoritesState } from './types';
import {
  fetchFavoritesAction,
  changeFavoriteStatusAction,
} from './api-actions';
import { makeFakeOffer, makeFakeOffers } from '@/mocks';

describe('favoritesSlice', () => {
  const initialState: FavoritesState = {
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

  describe('extra reducers', () => {
    describe('fetchFavoritesAction', () => {
      it('should set isLoading to true and clear errors with "fetchFavoritesAction.pending" action', () => {
        const action = { type: fetchFavoritesAction.pending.type };
        const result = favoritesSlice.reducer(initialState, action);

        expect(result.isLoading).toBe(true);
        expect(result.favoritesError).toBeNull();
        expect(result.favoritesToastError).toBeNull();
      });

      it('should set favorites and stop loading with "fetchFavoritesAction.fulfilled" action', () => {
        const mockFavorites = makeFakeOffers(3);
        const action = {
          type: fetchFavoritesAction.fulfilled.type,
          payload: mockFavorites,
        };
        const result = favoritesSlice.reducer(initialState, action);

        expect(result.favorites).toEqual(mockFavorites);
        expect(result.isLoading).toBe(false);
        expect(result.favoritesError).toBeNull();
        expect(result.favoritesToastError).toBeNull();
      });

      it('should set error and stop loading with "fetchFavoritesAction.rejected" action', () => {
        const errorMessage = 'Failed to load favorites';
        const action = {
          type: fetchFavoritesAction.rejected.type,
          error: { message: errorMessage },
        };
        const result = favoritesSlice.reducer(initialState, action);

        expect(result.isLoading).toBe(false);
        expect(result.favoritesError).toBe(errorMessage);
        expect(result.favoritesToastError).toBe(errorMessage);
      });
    });

    describe('changeFavoriteStatusAction', () => {
      it('should add offer to favorites with "changeFavoriteStatusAction.fulfilled" when isFavorite is true', () => {
        const stateWithFavorites = {
          ...initialState,
          favorites: makeFakeOffers(2),
        };

        const newOffer = makeFakeOffer('3');
        const action = {
          type: changeFavoriteStatusAction.fulfilled.type,
          payload: { ...newOffer, isFavorite: true },
        };

        const result = favoritesSlice.reducer(stateWithFavorites, action);

        expect(result.favorites).toHaveLength(3);
        expect(result.favorites[2].id).toBe('3');
      });

      it('should remove offer from favorites with "changeFavoriteStatusAction.fulfilled" when isFavorite is false', () => {
        const mockFavorites = makeFakeOffers(3);
        const stateWithFavorites = {
          ...initialState,
          favorites: mockFavorites,
        };

        const updatedOffer = { ...mockFavorites[1], isFavorite: false };
        const action = {
          type: changeFavoriteStatusAction.fulfilled.type,
          payload: updatedOffer,
        };

        const result = favoritesSlice.reducer(stateWithFavorites, action);

        expect(result.favorites).toHaveLength(2);
        expect(
          result.favorites.find((offer) => offer.id === '2'),
        ).toBeUndefined();
      });

      it('should set toast error with "changeFavoriteStatusAction.rejected" action', () => {
        const errorMessage = 'Failed to update favorite';
        const action = {
          type: changeFavoriteStatusAction.rejected.type,
          error: { message: errorMessage },
        };
        const result = favoritesSlice.reducer(initialState, action);

        expect(result.favoritesToastError).toBe(errorMessage);
      });
    });
  });
});

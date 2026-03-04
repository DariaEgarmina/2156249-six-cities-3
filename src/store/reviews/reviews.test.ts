import {
  reviewsSlice,
  clearComments,
  clearReviewsLoadError,
  clearReviewsSubmitError,
} from './slice';
import { makeFakeReviews } from '@/mocks';

describe('reviewsSlice', () => {
  const initialState = {
    reviews: [],
    isLoading: false,
    isSubmitting: false,
    loadError: null,
    submitError: null,
  };

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = reviewsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return same state with empty action', () => {
    const emptyAction = { type: '' };
    const result = reviewsSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should clear reviews with "clearComments" action', () => {
      const stateWithReviews = {
        ...initialState,
        reviews: makeFakeReviews(2),
      };

      const result = reviewsSlice.reducer(stateWithReviews, clearComments());

      expect(result.reviews).toEqual([]);
    });

    it('should clear loadError with "clearReviewsLoadError" action', () => {
      const stateWithError = {
        ...initialState,
        loadError: 'Some load error',
      };

      const result = reviewsSlice.reducer(
        stateWithError,
        clearReviewsLoadError(),
      );

      expect(result.loadError).toBeNull();
    });

    it('should clear submitError with "clearReviewsSubmitError" action', () => {
      const stateWithError = {
        ...initialState,
        submitError: 'Some submit error',
      };

      const result = reviewsSlice.reducer(
        stateWithError,
        clearReviewsSubmitError(),
      );

      expect(result.submitError).toBeNull();
    });
  });
});

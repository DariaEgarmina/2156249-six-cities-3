import {
  reviewsSlice,
  clearComments,
  clearReviewsLoadError,
  clearReviewsSubmitError,
} from './slice';
import { makeFakeReviews, makeFakeReview } from '@/utils/mocks';
import { fetchCommentsAction, postCommentAction } from './api-actions';

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

  describe('extra reducers', () => {
    describe('fetchCommentsAction', () => {
      it('should set isLoading to true and clear loadError with "fetchCommentsAction.pending" action', () => {
        const action = { type: fetchCommentsAction.pending.type };
        const result = reviewsSlice.reducer(initialState, action);

        expect(result.isLoading).toBe(true);
        expect(result.loadError).toBeNull();
      });

      it('should set sorted reviews and stop loading with "fetchCommentsAction.fulfilled" action', () => {
        const mockReviews = makeFakeReviews(3);
        const action = {
          type: fetchCommentsAction.fulfilled.type,
          payload: mockReviews,
        };
        const result = reviewsSlice.reducer(initialState, action);

        const sorted = [...mockReviews].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        expect(result.reviews).toEqual(sorted);
        expect(result.isLoading).toBe(false);
        expect(result.loadError).toBeNull();
      });

      it('should set loadError and submitError and stop loading with "fetchCommentsAction.rejected" action', () => {
        const errorMessage = 'Failed to load reviews';
        const action = {
          type: fetchCommentsAction.rejected.type,
          error: { message: errorMessage },
        };
        const result = reviewsSlice.reducer(initialState, action);

        expect(result.isLoading).toBe(false);
        expect(result.loadError).toBe(errorMessage);
        expect(result.submitError).toBe(errorMessage);
      });
    });

    describe('postCommentAction', () => {
      it('should set isSubmitting to true and clear submitError with "postCommentAction.pending" action', () => {
        const action = { type: postCommentAction.pending.type };
        const result = reviewsSlice.reducer(initialState, action);

        expect(result.isSubmitting).toBe(true);
        expect(result.submitError).toBeNull();
      });

      it('should add new review to beginning and stop submitting with "postCommentAction.fulfilled" action', () => {
        const mockReviews = makeFakeReviews(2);
        const stateWithReviews = {
          ...initialState,
          reviews: mockReviews,
        };

        const newReview = makeFakeReview('3');
        const action = {
          type: postCommentAction.fulfilled.type,
          payload: newReview,
        };

        const result = reviewsSlice.reducer(stateWithReviews, action);

        expect(result.reviews).toHaveLength(3);
        expect(result.reviews[0]).toEqual(newReview);
        expect(result.isSubmitting).toBe(false);
        expect(result.submitError).toBeNull();
      });

      it('should set submitError and stop submitting with "postCommentAction.rejected" action (not 404)', () => {
        const errorMessage = 'Failed to send comment';
        const action = {
          type: postCommentAction.rejected.type,
          error: { message: errorMessage },
        };
        const result = reviewsSlice.reducer(initialState, action);

        expect(result.isSubmitting).toBe(false);
        expect(result.submitError).toBe(errorMessage);
      });

      it('should not set submitError with "postCommentAction.rejected" action when error is 404', () => {
        const action = {
          type: postCommentAction.rejected.type,
          error: { message: '404 Not Found' },
        };
        const result = reviewsSlice.reducer(initialState, action);

        expect(result.isSubmitting).toBe(false);
        expect(result.submitError).toBeNull();
      });
    });
  });
});

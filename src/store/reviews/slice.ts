import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewsState } from './types';
import { NameSpace } from '@/const';
import { fetchCommentsAction, postCommentAction } from './api-actions';
import { Review } from '@/types/review';

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  isSubmitting: false,
  loadError: null,
  submitError: null,
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    clearComments: (state) => {
      state.reviews = [];
    },
    clearReviewsLoadError: (state) => {
      state.loadError = null;
    },
    clearReviewsSubmitError: (state) => {
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isLoading = true;
        state.loadError = null;
      })
      .addCase(
        fetchCommentsAction.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          const sortedReviews = [...action.payload].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
          state.reviews = sortedReviews;
          state.isLoading = false;
          state.loadError = null;
        },
      )
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.loadError = action.error.message || 'Failed to load reviews';
        state.submitError = action.error.message || 'Failed to load reviews';
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(
        postCommentAction.fulfilled,
        (state, action: PayloadAction<Review>) => {
          state.reviews.unshift(action.payload);
          state.isSubmitting = false;
          state.submitError = null;
        },
      )
      .addCase(postCommentAction.rejected, (state, action) => {
        state.isSubmitting = false;
        if (!action.error.message?.includes('404')) {
          state.submitError = action.error.message || 'Failed to send comment';
        }
      });
  },
});

export const { clearComments, clearReviewsLoadError, clearReviewsSubmitError } =
  reviewsSlice.actions;
export default reviewsSlice.reducer;

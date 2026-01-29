import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewsState } from './types';
import { NameSpace } from '@/const';
import { fetchCommentsAction, postCommentAction } from './api-actions';
import { Review } from '@/types/review';

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  isSubmitting: false,
  error: null,
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    clearComments: (state) => {
      state.reviews = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCommentsAction.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          const sortedReviews = [...action.payload].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
          state.reviews = sortedReviews;
          state.isLoading = false;
        },
      )
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось загрузить комментарии';
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(
        postCommentAction.fulfilled,
        (state, action: PayloadAction<Review>) => {
          state.reviews.unshift(action.payload);
          state.isSubmitting = false;
        },
      )
      .addCase(postCommentAction.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error =
          action.error.message || 'Не удалось отправить комментарий';
      });
  },
});

export const { clearComments, clearError } = reviewsSlice.actions;
export default reviewsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { ReviewsState } from './types';
import { NameSpace } from '@/const';
import { fetchCommentsAction, postCommentAction } from './api-actions';

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось загрузить комментарии';
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
        state.isSubmitting = false;
      })
      .addCase(postCommentAction.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error =
          action.error.message || 'Не удалось отправить комментарий';
      });
  },
});

export const { clearComments } = reviewsSlice.actions;
export default reviewsSlice.reducer;

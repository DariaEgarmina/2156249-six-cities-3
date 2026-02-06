import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '@/const';
import { Review } from '@/types/review';
import { CommentData } from './types';

export const fetchCommentsAction = createAsyncThunk<
  Review[],
  string,
  {
    extra: AxiosInstance;
  }
>('reviews/fetchComments', async (offerId, { extra: api }) => {
  const { data } = await api.get<Review[]>(
    APIRoute.Comments.replace(':offerId', offerId),
  );
  return data;
});

export const postCommentAction = createAsyncThunk<
  Review,
  { offerId: string; commentData: CommentData },
  {
    extra: AxiosInstance;
  }
>('reviews/postComment', async ({ offerId, commentData }, { extra: api }) => {
  const { data } = await api.post<Review>(
    APIRoute.Comments.replace(':offerId', offerId),
    commentData,
  );
  return data;
});

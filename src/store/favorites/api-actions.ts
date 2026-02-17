import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '@/const';
import { Offer } from '@/types/offer';
import { ChangeFavoriteStatusPayload } from './types';

export const fetchFavoritesAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    extra: AxiosInstance;
  }
>('favorites/fetchFavorites', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Favorite);
  return data;
});

export const changeFavoriteStatusAction = createAsyncThunk<
  Offer,
  ChangeFavoriteStatusPayload,
  {
    extra: AxiosInstance;
  }
>('favorites/changeStatus', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(
    `${APIRoute.Favorite}/${offerId}/${status}`,
  );
  return data;
});

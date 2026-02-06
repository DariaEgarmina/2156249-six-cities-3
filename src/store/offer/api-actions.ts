import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '@/const';
import { FullOffer, Offer } from '@/types/offer';

export const fetchOfferAction = createAsyncThunk<
  FullOffer,
  string,
  {
    extra: AxiosInstance;
  }
>('offer/fetchOffer', async (id, { extra: api }) => {
  const { data } = await api.get<FullOffer>(APIRoute.Offer.replace(':id', id));
  return data;
});

export const fetchNearbyOffersAction = createAsyncThunk<
  Offer[],
  string,
  {
    extra: AxiosInstance;
  }
>('offer/fetchNearbyOffers', async (id, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Nearby.replace(':id', id));
  return data;
});

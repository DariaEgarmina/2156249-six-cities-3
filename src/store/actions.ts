import { createAction } from '@reduxjs/toolkit';
import { CITIES } from '@/const';
import { SortType } from '@/types/sort';
import { Offer } from '@/types/offer';

export const setCity = createAction<(typeof CITIES)[number]>('setCity');
export const setActiveSort = createAction<SortType>('setActiveSort');
export const setSelectedOfferId = createAction<string | null>(
  'setSelectedOffer'
);
export const loadOffers = createAction<Offer[]>('data/loadOffers');

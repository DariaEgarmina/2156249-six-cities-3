import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '@/const';
import { Offer } from '@/types/offer';

export const loadOffers = createAction<Offer[]>('loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setError = createAction<string | null>('setError');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

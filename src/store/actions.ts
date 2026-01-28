import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '@/const';

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setError = createAction<string | null>('setError');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

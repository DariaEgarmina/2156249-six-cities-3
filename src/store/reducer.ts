import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '@/const';
import offersReducer from '@/store/offers';
import authReducer from '@/store/auth';
import offerReducer from '@/store/offer';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersReducer,
  [NameSpace.Auth]: authReducer,
  [NameSpace.Offer]: offerReducer,
});

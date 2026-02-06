import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '@/const';
import offersReducer from '@/store/offers';
import authReducer from '@/store/auth';
import offerReducer from '@/store/offer';
import reviewsReducer from '@/store/reviews';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersReducer,
  [NameSpace.Auth]: authReducer,
  [NameSpace.Offer]: offerReducer,
  [NameSpace.Reviews]: reviewsReducer,
});

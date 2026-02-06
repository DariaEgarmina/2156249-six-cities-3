import { State } from '@/store';
import { NameSpace } from '@/const';

export const getReviews = (state: State) => state[NameSpace.Reviews].reviews;
export const getIsReviewsLoading = (state: State) =>
  state[NameSpace.Reviews].isLoading;
export const getIsSubmitting = (state: State) =>
  state[NameSpace.Reviews].isSubmitting;
export const getLoadError = (state: State) =>
  state[NameSpace.Reviews].loadError;
export const getSubmitError = (state: State) =>
  state[NameSpace.Reviews].submitError;

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import './error-message.css';
import { getError, clearError } from '@/store/offers';
import { getAuthError, clearAuthError } from '@/store/auth';
import { getSubmitError, clearReviewsSubmitError } from '@/store/reviews';
import { getNearbyToastError, clearNearbyToastError } from '@/store/offer';
import { TIMEOUT_SHOW_ERROR } from '@/const';

function ErrorMessage(): JSX.Element | null {
  const dispatch = useAppDispatch();

  const offersError = useAppSelector(getError);
  const authError = useAppSelector(getAuthError);
  const submitReviewsError = useAppSelector(getSubmitError);
  const nearbyError = useAppSelector(getNearbyToastError);

  const error = authError || offersError || submitReviewsError || nearbyError;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        if (offersError) {
          dispatch(clearError());
        } else if (authError) {
          dispatch(clearAuthError());
        } else if (submitReviewsError) {
          dispatch(clearReviewsSubmitError());
        } else if (nearbyError) {
          dispatch(clearNearbyToastError());
        }
      }, TIMEOUT_SHOW_ERROR);

      return () => clearTimeout(timer);
    }
  }, [
    error,
    offersError,
    authError,
    submitReviewsError,
    nearbyError,
    dispatch,
  ]);

  return error ? <div className="error-message">{error}</div> : null;
}

export default ErrorMessage;

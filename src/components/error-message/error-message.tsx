import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import './error-message.css';
import { getError, clearError } from '@/store/offers';
import { getAuthError, clearAuthError } from '@/store/auth';
import { getReviewsError, clearReviewsError } from '@/store/reviews';
import { TIMEOUT_SHOW_ERROR } from '@/const';

function ErrorMessage(): JSX.Element | null {
  const dispatch = useAppDispatch();

  const offersError = useAppSelector(getError);
  const authError = useAppSelector(getAuthError);
  const reviewsError = useAppSelector(getReviewsError);

  const error = authError || offersError || reviewsError;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        if (offersError) {
          dispatch(clearError());
        } else if (authError) {
          dispatch(clearAuthError());
        } else if (reviewsError) {
          dispatch(clearReviewsError());
        }
      }, TIMEOUT_SHOW_ERROR);

      return () => clearTimeout(timer);
    }
  }, [error, offersError, authError, reviewsError, dispatch]);

  return error ? <div className="error-message">{error}</div> : null;
}

export default ErrorMessage;

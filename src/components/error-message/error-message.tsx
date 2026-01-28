import { useAppSelector } from '@/hooks';
import './error-message.css';
import { getError } from '@/store/offers';
import { getAuthError } from '@/store/auth';

function ErrorMessage(): JSX.Element | null {
  const offersError = useAppSelector(getError);
  const authError = useAppSelector(getAuthError);
  const error = authError || offersError;

  return error ? <div className="error-message">{error}</div> : null;
}

export default ErrorMessage;

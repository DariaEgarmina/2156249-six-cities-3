import { useAppDispatch } from '@/hooks';
import { fetchOffersAction } from '@/store/offers';
import './error-screen.css';

function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="error-screen">
      <p className="error-screen__text">Не удалось загрузить предложения</p>
      <button
        onClick={() => {
          dispatch(fetchOffersAction());
        }}
        className="error-screen__button"
        type="button"
      >
        Попробовать ещё раз
      </button>
    </div>
  );
}

export default ErrorScreen;

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { changeFavoriteStatusAction } from '@/store/favorites';
import { isAuth } from '@/store/auth';
import { AppRoute } from '@/const';

type BookmarkButtonProps = {
  isFavorite: boolean;
  buttonType: 'card' | 'page';
  offerId: string;
};

const sizes = {
  card: {
    width: 18,
    height: 19,
  },
  page: {
    width: 31,
    height: 33,
  },
};

function BookmarkButton({
  isFavorite,
  buttonType,
  offerId,
}: BookmarkButtonProps): JSX.Element {
  const { width, height } = sizes[buttonType];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(isAuth);

  const handleClick = () => {
    if (!isAuthorized) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(
      changeFavoriteStatusAction({
        offerId,
        status: isFavorite ? 0 : 1,
      }),
    );
  };

  return (
    <button
      className={clsx('button', {
        'place-card__bookmark-button': buttonType === 'card',
        'offer__bookmark-button': buttonType === 'page',
        'place-card__bookmark-button--active':
          buttonType === 'card' && isFavorite,
        'offer__bookmark-button--active': buttonType === 'page' && isFavorite,
      })}
      type="button"
      onClick={handleClick}
    >
      <svg
        className={clsx({
          'place-card__bookmark-icon': buttonType === 'card',
          'offer__bookmark-icon': buttonType === 'page',
        })}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

export default BookmarkButton;

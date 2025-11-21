import clsx from 'clsx';

type BookmarkButtonProps = {
  isFavorite: boolean;
  buttonType: 'card' | 'page';
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
}: BookmarkButtonProps): JSX.Element {
  const { width, height } = sizes[buttonType];

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

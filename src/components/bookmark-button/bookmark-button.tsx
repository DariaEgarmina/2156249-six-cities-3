import clsx from 'clsx';

type BookmarkButtonProps = {
  isFavorite: boolean;
  buttonType: 'card' | 'page';
};

function BookmarkButton({
  isFavorite,
  buttonType,
}: BookmarkButtonProps): JSX.Element {
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
        width={buttonType === 'card' ? 18 : 31}
        height={buttonType === 'card' ? 19 : 33}
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

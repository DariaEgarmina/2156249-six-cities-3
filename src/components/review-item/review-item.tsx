import { Review } from '@/types/review';
import { formatDate } from '@/utils/utils';
import { AppLimit } from '@/const';

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const { user, rating, comment, date } = review;
  const { name, avatarUrl } = user;
  const starsWidth = `${(rating / AppLimit.MaxRating) * 100}%`;

  return (
    <li className="reviews__item" data-testid="review-item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width={54}
            height={54}
            alt={`Аватар пользователя ${name}`}
            data-testid="review-avatar"
          />
        </div>
        <span className="reviews__user-name" data-testid="review-author">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: starsWidth }} data-testid="review-stars" />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text" data-testid="review-text">
          {comment}
        </p>
        <time
          className="reviews__time"
          dateTime={date}
          data-testid="review-date"
        >
          {formatDate(date)}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;

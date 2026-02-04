import { Review } from '@/types/review';
import ReviewItem from '../review-item/review-item';
import { useAppSelector } from '@/hooks';
import { getLoadError } from '@/store/reviews';
import ErrorPanel from '../error-panel/error-panel';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const loadReviewsError = useAppSelector(getLoadError);

  if (loadReviewsError) {
    return (
      <ErrorPanel message="Failed to load reviews. Please try again later." />
    );
  }

  const displayedReviews = reviews.slice(0, 10);

  return (
    <ul className="reviews__list">
      {displayedReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;

import { Review } from '@/types/review';
import ReviewItem from '../review-item/review-item';
import { useAppSelector } from '@/hooks';
import { getLoadError } from '@/store/reviews';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const loadReviewsError = useAppSelector(getLoadError);

  if (loadReviewsError) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#ff0000',
          border: '1px solid #ffcccc',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          margin: '20px 0',
        }}
      >
        Failed to load reviews. Please try again later.
      </div>
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

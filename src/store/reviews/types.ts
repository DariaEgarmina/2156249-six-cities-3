import { Review } from '@/types/review';

export type ReviewsState = {
  reviews: Review[];
  isLoading: boolean;
  isSubmitting: boolean;
  loadError: string | null;
  submitError: string | null;
};

export type CommentData = {
  comment: string;
  rating: number;
};

import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { makeFakeReview } from '@/mocks';
import { formatDate } from '@/utils/utils';
import { AppLimit } from '@/const';

describe('Component: ReviewItem', () => {
  it('should render correct with review data', () => {
    const mockReview = makeFakeReview('1');
    const { user, rating, comment, date } = mockReview;
    const expectedStarsWidth = `${(rating / AppLimit.MaxRating) * 100}%`;

    render(<ReviewItem review={mockReview} />);

    expect(screen.getByTestId('review-item')).toBeInTheDocument();
    expect(screen.getByTestId('review-avatar')).toHaveAttribute(
      'src',
      user.avatarUrl,
    );
    expect(screen.getByTestId('review-author')).toHaveTextContent(user.name);
    expect(screen.getByTestId('review-text')).toHaveTextContent(comment);
    expect(screen.getByTestId('review-date')).toHaveTextContent(
      formatDate(date),
    );
    expect(screen.getByTestId('review-stars')).toHaveStyle({
      width: expectedStarsWidth,
    });
  });

  it('should render with correct alt text for avatar', () => {
    const mockReview = makeFakeReview('1');
    const { user } = mockReview;

    render(<ReviewItem review={mockReview} />);

    const avatar = screen.getByTestId('review-avatar');
    expect(avatar).toHaveAttribute('alt', `Аватар пользователя ${user.name}`);
  });
});

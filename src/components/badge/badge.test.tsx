import { render, screen } from '@testing-library/react';
import Badge from './badge';

describe('Component: Badge', () => {
  it('should render correct with card type', () => {
    const expectedText = 'Premium';
    render(<Badge text={expectedText} parentType="card" />);

    const badge = screen.getByTestId('badge-container');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('place-card__mark');
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correct with page type', () => {
    const expectedText = 'Premium';
    render(<Badge text={expectedText} parentType="page" />);

    const badge = screen.getByTestId('badge-container');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('offer__mark');
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

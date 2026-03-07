import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render correct', () => {
    const favoritesEmptyTestId = 'favorites-empty';
    const expectedText = /Nothing yet saved/i;

    render(<FavoritesEmpty />);

    const emptyComponent = screen.getByTestId(favoritesEmptyTestId);
    expect(emptyComponent).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

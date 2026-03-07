import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Component: Loading', () => {
  it('should render correct', () => {
    render(<Loading />);

    const loadingContainer = screen.getByTestId('loading-container');
    const loaderCircle = screen.getByTestId('loader-circle');

    expect(loadingContainer).toBeInTheDocument();
    expect(loadingContainer).toHaveAttribute('aria-label', 'Загрузка данных');
    expect(loadingContainer).toHaveAttribute('role', 'status');
    expect(loaderCircle).toBeInTheDocument();
    expect(loaderCircle).toHaveClass('loader__circle');
  });
});

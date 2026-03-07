import { render, screen } from '@testing-library/react';
import FullPageError from './full-page-error';

describe('Component: FullPageError', () => {
  it('should render correct with default message', () => {
    render(<FullPageError error={null} />);

    const container = screen.getByTestId('full-page-error');
    const button = screen.getByTestId('reload-button');

    expect(container).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Try again');
  });

  it('should render correct with custom error message', () => {
    const errorMessage = '404 Not Found';
    render(<FullPageError error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText(/Failed to load data/i)).not.toBeInTheDocument();
  });
});

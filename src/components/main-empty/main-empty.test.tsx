import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('Component: MainEmpty', () => {
  it('should render correct with active city', () => {
    const testCity = 'Paris';

    render(<MainEmpty activeCity={testCity} />);

    const section = screen.getByTestId('main-empty-section');
    const description = screen.getByTestId('city-description');

    expect(section).toBeInTheDocument();
    expect(
      screen.getByText(/No places to stay available/i),
    ).toBeInTheDocument();
    expect(description).toHaveTextContent(
      `We could not find any property available at the moment in ${testCity}`,
    );
  });

  it('should render with different city', () => {
    const testCity = 'Amsterdam';

    render(<MainEmpty activeCity={testCity} />);

    const description = screen.getByTestId('city-description');
    expect(description).toHaveTextContent(
      `We could not find any property available at the moment in ${testCity}`,
    );
  });
});

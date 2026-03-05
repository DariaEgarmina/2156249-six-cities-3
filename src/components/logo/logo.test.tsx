import { render, screen } from '@testing-library/react';
import { withHistory } from '@/utils/mock-component';
import Logo from './logo';
import { Sizes } from './const';
import { AppRoute } from '@/const';

describe('Component: Logo', () => {
  it('should render correctly with header type', () => {
    const preparedComponent = withHistory(<Logo type="header" />);
    render(preparedComponent);

    const link = screen.getByTestId('logo-link');
    const image = screen.getByTestId('logo-image');

    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('header__logo-link');
    expect(link).toHaveAttribute('href', AppRoute.Main);
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('header__logo');
    expect(image).toHaveAttribute('width', String(Sizes.header.width));
    expect(image).toHaveAttribute('height', String(Sizes.header.height));
    expect(image).toHaveAttribute('src', 'img/logo.svg');
  });

  it('should render correctly with footer type', () => {
    const preparedComponent = withHistory(<Logo type="footer" />);
    render(preparedComponent);

    const link = screen.getByTestId('logo-link');
    const image = screen.getByTestId('logo-image');

    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('footer__logo-link');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('footer__logo');
    expect(image).toHaveAttribute('width', String(Sizes.footer.width));
    expect(image).toHaveAttribute('height', String(Sizes.footer.height));
  });
});

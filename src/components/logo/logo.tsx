import { Link } from 'react-router-dom';
import { AppRoute } from '@/const';
import { Sizes } from './const';

type LogoProps = {
  type: 'header' | 'footer';
};

function Logo({ type }: LogoProps): JSX.Element {
  const { width, height } = Sizes[type];

  return (
    <Link
      className={`${type}__logo-link`}
      to={AppRoute.Main}
      data-testid="logo-link"
    >
      <img
        className={`${type}__logo`}
        src="img/logo.svg"
        alt="Логотип сервиса аренды жилья 6 cities (Шесть городов)"
        width={width}
        height={height}
        data-testid="logo-image"
      />
    </Link>
  );
}

export default Logo;

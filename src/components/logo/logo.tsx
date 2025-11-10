import { Link } from 'react-router-dom';
import { AppRoute } from '@/const';

function Logo(): JSX.Element {
  return (
    <Link className="header__logo-link" to={AppRoute.Main}>
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="Логотип сервиса аренды жилья 6 cities (Шесть городов)"
        width="81"
        height="41"
      />
    </Link>
  );
}

export default Logo;

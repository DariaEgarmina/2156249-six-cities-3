import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities: Page not found</title>
      </Helmet>
      <h1>Ошибка 404. Страница не существует.</h1>
      <Link to="/">Вернуться на главную страницу</Link>
    </>
  );
}

export default NotFoundScreen;

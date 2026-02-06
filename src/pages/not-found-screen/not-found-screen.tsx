import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities: Page not found</title>
      </Helmet>
      <h1>Error 404. Page not found.</h1>
      <Link to="/">Go back to the main page</Link>
    </>
  );
}

export default NotFoundScreen;

import { Helmet } from 'react-helmet-async';
import { Offers } from '@/types/offer';
import Logo from '@/components/logo/logo';
import UserNavigation from '@/components/user-navigation/user-navigation';
import FavoritesList from '@/components/favorites-list/favorites-list';

type FavoritesScreenProps = {
  favorites: Offers;
};

function FavoritesScreen({ favorites }: FavoritesScreenProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo type="header" />
            </div>
            <nav className="header__nav">
              <UserNavigation
                isAuth
                userEmail="Oliver.conner@gmail.com"
                favoriteCount={3}
              />
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList favorites={favorites} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo type="footer" />
      </footer>
    </div>
  );
}

export default FavoritesScreen;

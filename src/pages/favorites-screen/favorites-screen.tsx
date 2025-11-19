import { Helmet } from 'react-helmet-async';
import { Offer } from '@/types/offer';
import Header from '@/components/header/header';
import Logo from '@/components/logo/logo';
import FavoritesList from '@/components/favorites-list/favorites-list';

type FavoritesScreenProps = {
  favorites: Offer[];
};

function FavoritesScreen({ favorites }: FavoritesScreenProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header isAuth userEmail="Oliver.conner@gmail.com" favoriteCount={3} />
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

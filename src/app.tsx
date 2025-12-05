import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from './const';
import MainScreen from './pages/main-screen/main-screen';
import LoginScreen from './pages/login-screen/login-screen';
import FavoritesScreen from './pages/favorites-screen/favorites-screen';
import OfferScreen from './pages/offer-screen/offer-screen';
import NotFoundScreen from './pages/not-found-screen/not-found-screen';
import PrivateRoute from './components/private-route/private-route';
import { FullOffer } from './types/offer';
import { Reviews } from './types/review';

type AppScreenProps = {
  offers: FullOffer[];
  reviews: Reviews;
};

function App({ offers, reviews }: AppScreenProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <NotFoundScreen />,
      children: [
        {
          path: AppRoute.Main,
          element: <MainScreen />,
        },
        {
          path: AppRoute.Login,
          element: <LoginScreen />,
        },
        {
          path: AppRoute.Favorites,
          element: (
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesScreen favorites={favoriteOffers} />
            </PrivateRoute>
          ),
        },
        {
          path: AppRoute.Offer,
          element: <OfferScreen reviews={reviews} offers={offers} />,
        },
        {
          path: '*',
          element: <NotFoundScreen />,
        },
      ],
    },
  ]);

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;

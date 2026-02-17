import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from './const';
import MainScreen from './pages/main-screen/main-screen';
import LoginScreen from './pages/login-screen/login-screen';
import FavoritesScreen from './pages/favorites-screen/favorites-screen';
import OfferScreen from './pages/offer-screen/offer-screen';
import NotFoundScreen from './pages/not-found-screen/not-found-screen';
import PrivateRoute from './components/private-route/private-route';
import { useAppSelector, useAppDispatch } from './hooks';
import { getOffersLoadingStatus } from './store/offers';
import Loading from './components/loading/loading';
import { getAuthStatus } from './store/auth';
import { fetchFavoritesAction } from './store/favorites';

const router = createBrowserRouter([
  {
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
          <PrivateRoute>
            <FavoritesScreen />
          </PrivateRoute>
        ),
      },
      {
        path: AppRoute.Offer,
        element: <OfferScreen />,
      },
      {
        path: AppRoute.NotFound,
        element: <NotFoundScreen />,
      },
      {
        path: '*',
        element: <NotFoundScreen />,
      },
    ],
  },
]);

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);
  const isOffersDataLoading = useAppSelector(getOffersLoadingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [authorizationStatus, dispatch]);

  if (
    authorizationStatus === AuthorizationStatus.Unknown ||
    isOffersDataLoading
  ) {
    return <Loading />;
  }

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;

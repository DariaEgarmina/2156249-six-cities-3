import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from './const';
import MainScreen from './pages/main-screen/main-screen';
import LoginScreen from './pages/login-screen/login-screen';
import FavoritesScreen from './pages/favorites-screen/favorites-screen';
import OfferScreen from './pages/offer-screen/offer-screen';
import NotFoundScreen from './pages/not-found-screen/not-found-screen';
import PrivateRoute from './components/private-route/private-route';
import { useAppSelector } from './hooks';
import { getOffersLoadingStatus } from './store/offers';
import LoadingScreen from './pages/loading-screen/loading-screen';

function App(): JSX.Element {
  // const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersLoadingStatus);

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
              <FavoritesScreen />
            </PrivateRoute>
          ),
        },
        {
          path: AppRoute.Offer,
          element: <OfferScreen />,
        },
        {
          path: '*',
          element: <NotFoundScreen />,
        },
      ],
    },
  ]);

  // if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
  //   return <LoadingScreen />;
  // }

  if (isOffersDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from './const';
import MainScreen from './pages/main-screen/main-screen';
import LoginScreen from './pages/login-screen/login-screen';
import FavoritesScreen from './pages/favorites-screen/favorites-screen';
import OfferScreen from './pages/offer-screen/offer-screen';
import NotFoundScreen from './pages/not-found-screen/not-found-screen';
import PrivateRoute from './components/private-route/private-route';

function App(): JSX.Element {
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

  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;

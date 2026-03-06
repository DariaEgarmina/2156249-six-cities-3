import MainScreen from '@/pages/main-screen/main-screen';
import LoginScreen from '@/pages/login-screen/login-screen';
import FavoritesScreen from '@/pages/favorites-screen/favorites-screen';
import OfferScreen from '@/pages/offer-screen/offer-screen';
import PrivateRoute from '@/components/private-route/private-route';
import NotFoundScreen from '@/pages/not-found-screen/not-found-screen';
import { AppRoute } from '@/const';

export const appRoutes = [
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
];

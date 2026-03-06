import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus } from '@/const';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getOffersLoadingStatus } from '@/store/offers';
import Loading from '@/components/loading/loading';
import { getAuthStatus } from '@/store/auth';
import { fetchFavoritesAction } from '@/store/favorites';
import { appRoutes } from './app-routes';

type AppProps = {
  router?: ReturnType<typeof createBrowserRouter>;
};

function App({ router }: AppProps = {}): JSX.Element {
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

  const routerToUse = router ?? createBrowserRouter(appRoutes);

  return (
    <HelmetProvider>
      <RouterProvider router={routerToUse} />
    </HelmetProvider>
  );
}

export default App;

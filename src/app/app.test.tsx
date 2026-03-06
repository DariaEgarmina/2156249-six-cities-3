import { render, screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import App from './app';
import { appRoutes } from './app-routes';
import { AppRoute, AuthorizationStatus, NameSpace } from '@/const';
import { createAPI } from '@/services/api';
import { State } from '@/store';
import { Action } from 'redux';
import { AppThunkDispatch } from '@/utils/mocks';
import { makeFakeStore } from '@/utils/mocks';

vi.mock('@/pages/main-screen/main-screen', () => ({
  default: () => <div>Main Screen Mock</div>,
}));

vi.mock('@/pages/login-screen/login-screen', () => ({
  default: () => <div>Login Screen Mock</div>,
}));

vi.mock('@/pages/favorites-screen/favorites-screen', () => ({
  default: () => <div>Favorites Screen Mock</div>,
}));

vi.mock('@/pages/offer-screen/offer-screen', () => ({
  default: () => <div>Offer Screen Mock</div>,
}));

vi.mock('@/pages/not-found-screen/not-found-screen', () => ({
  default: () => <div>404 Not Found Mock</div>,
}));

vi.mock('@/components/loading/loading', () => ({
  default: () => <div>Loading...</div>,
}));

describe('Application Routing', () => {
  const renderWithRouter = (route: string, initialState?: Partial<State>) => {
    const fullState = makeFakeStore(initialState);

    const axios = createAPI();
    const middleware = [thunk.withExtraArgument(axios)];
    const mockStoreCreator = configureMockStore<
      State,
      Action<string>,
      AppThunkDispatch
    >(middleware);
    const store = mockStoreCreator(fullState);

    const testRouter = createMemoryRouter(appRoutes, {
      initialEntries: [route],
    });

    return render(
      <Provider store={store}>
        <HelmetProvider>
          <App router={testRouter} />
        </HelmetProvider>
      </Provider>,
    );
  };

  it('should render MainScreen when route is "/"', () => {
    renderWithRouter(AppRoute.Main, {
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        isSubmitting: false,
        error: null,
      },
    });

    expect(screen.getByText('Main Screen Mock')).toBeInTheDocument();
  });

  it('should render LoginScreen when route is "/login"', () => {
    renderWithRouter(AppRoute.Login, {
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        isSubmitting: false,
        error: null,
      },
    });

    expect(screen.getByText('Login Screen Mock')).toBeInTheDocument();
  });

  it('should render FavoritesScreen when route is "/favorites" (authorized)', () => {
    renderWithRouter(AppRoute.Favorites, {
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        isSubmitting: false,
        error: null,
      },
    });

    expect(screen.getByText('Favorites Screen Mock')).toBeInTheDocument();
  });

  it('should render OfferScreen when route is "/offer/123"', () => {
    renderWithRouter('/offer/123', {
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        isSubmitting: false,
        error: null,
      },
    });

    expect(screen.getByText('Offer Screen Mock')).toBeInTheDocument();
  });

  it('should render NotFoundScreen when route is unknown', () => {
    renderWithRouter('/unknown-route', {
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        isSubmitting: false,
        error: null,
      },
    });

    expect(screen.getByText('404 Not Found Mock')).toBeInTheDocument();
  });

  it('should render Loading when authorization status is Unknown', () => {
    renderWithRouter(AppRoute.Main, {
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
        isSubmitting: false,
        error: null,
      },
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should not render FavoritesScreen when not authorized', () => {
    renderWithRouter(AppRoute.Favorites, {
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        isSubmitting: false,
        error: null,
      },
    });

    expect(screen.queryByText('Favorites Screen Mock')).not.toBeInTheDocument();
  });

  it('should render FavoritesScreen when authorized', () => {
    renderWithRouter(AppRoute.Favorites, {
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        isSubmitting: false,
        error: null,
      },
    });

    expect(screen.getByText('Favorites Screen Mock')).toBeInTheDocument();
  });
});

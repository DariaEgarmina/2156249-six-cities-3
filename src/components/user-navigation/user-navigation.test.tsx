import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '@/utils/mock-component';
import UserNavigation from './user-navigation';
import { makeFakeStore } from '@/utils/mocks';
import { NameSpace, AppRoute, AuthorizationStatus } from '@/const';
import { logoutAction } from '@/store/auth/api-actions';
import { extractActionsTypes, makeFakeOffers } from '@/utils/mocks';
import { UserData } from '@/types/user-data';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Component: UserNavigation', () => {
  it('should render sign in link when user is not authorized', () => {
    const { withStoreComponent } = withStore(
      <UserNavigation />,
      makeFakeStore({
        [NameSpace.Auth]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
          isSubmitting: false,
          error: null,
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByTestId('sign-in-link')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByTestId('sign-out-link')).not.toBeInTheDocument();
  });

  it('should render user info when user is authorized', () => {
    const userEmail = 'test@example.com';
    const favoritesCount = 3;

    const mockUserData: UserData = {
      name: 'Test User',
      avatarUrl: 'test-avatar.jpg',
      isPro: false,
      email: userEmail,
      token: 'test-token',
    };

    const mockFavorites = makeFakeOffers(favoritesCount);

    const { withStoreComponent } = withStore(
      <UserNavigation />,
      makeFakeStore({
        [NameSpace.Auth]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: mockUserData,
          isSubmitting: false,
          error: null,
        },
        [NameSpace.Favorites]: {
          favorites: mockFavorites,
          isLoading: false,
          favoritesError: null,
          favoritesToastError: null,
        },
      }),
    );

    render(withStoreComponent);

    expect(screen.getByTestId('favorites-link')).toBeInTheDocument();
    expect(screen.getByText(userEmail)).toBeInTheDocument();
    expect(screen.getByText(favoritesCount.toString())).toBeInTheDocument();
    expect(screen.getByTestId('sign-out-link')).toBeInTheDocument();
  });

  it('should dispatch logoutAction when sign out link is clicked', async () => {
    const userEmail = 'test@example.com';

    const mockUserData: UserData = {
      name: 'Test User',
      avatarUrl: 'test-avatar.jpg',
      isPro: false,
      email: userEmail,
      token: 'test-token',
    };

    const { withStoreComponent, mockStore } = withStore(
      <UserNavigation />,
      makeFakeStore({
        [NameSpace.Auth]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: mockUserData,
          isSubmitting: false,
          error: null,
        },
      }),
    );

    render(withStoreComponent);

    const signOutLink = screen.getByTestId('sign-out-link');
    await userEvent.click(signOutLink);

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toContain(logoutAction.pending.type);
  });

  it('should have correct link to favorites', () => {
    const userEmail = 'test@example.com';

    const mockUserData: UserData = {
      name: 'Test User',
      avatarUrl: 'test-avatar.jpg',
      isPro: false,
      email: userEmail,
      token: 'test-token',
    };

    const { withStoreComponent } = withStore(
      <UserNavigation />,
      makeFakeStore({
        [NameSpace.Auth]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: mockUserData,
          isSubmitting: false,
          error: null,
        },
      }),
    );

    render(withStoreComponent);

    const favoritesLink = screen.getByTestId('favorites-link');
    expect(favoritesLink).toHaveAttribute('href', AppRoute.Favorites);
  });
});

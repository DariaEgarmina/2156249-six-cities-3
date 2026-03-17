import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withStore } from '@/utils/mock-component';
import BookmarkButton from './bookmark-button';
import { makeFakeStore } from '@/utils/mocks';
import { NameSpace, AppRoute, AuthorizationStatus } from '@/const';
import { changeFavoriteStatusAction } from '@/store/favorites/api-actions';
import { extractActionsTypes } from '@/utils/mocks';

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

describe('Component: BookmarkButton', () => {
  const offerId = '123';

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <BookmarkButton isFavorite={false} buttonType="card" offerId={offerId} />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();
    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
  });

  it('should render with "In bookmarks" when isFavorite is true', () => {
    const { withStoreComponent } = withStore(
      <BookmarkButton isFavorite buttonType="card" offerId={offerId} />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
  });

  it('should dispatch changeFavoriteStatusAction when user is authorized', async () => {
    const { withStoreComponent, mockStore } = withStore(
      <BookmarkButton isFavorite={false} buttonType="card" offerId={offerId} />,
      makeFakeStore({
        [NameSpace.Auth]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null,
          isSubmitting: false,
          error: null,
        },
      }),
    );

    render(withStoreComponent);

    const button = screen.getByTestId('bookmark-button');
    await userEvent.click(button);

    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toContain(changeFavoriteStatusAction.pending.type);
  });

  it('should redirect to login when user is not authorized', async () => {
    const { withStoreComponent } = withStore(
      <BookmarkButton isFavorite={false} buttonType="card" offerId={offerId} />,
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

    const button = screen.getByTestId('bookmark-button');
    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login);
  });
});

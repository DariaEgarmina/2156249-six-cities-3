import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { logoutAction, isAuth, getUserEmail } from '@/store/auth';
import { AppRoute } from '@/const';
import { getFavorites } from '@/store/favorites';

function UserNavigation(): JSX.Element {
  const isAuthorized = useAppSelector(isAuth);
  const userEmail = useAppSelector(getUserEmail);
  const favorites = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();

  const handleLogoutClick = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const handleLogoutKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      dispatch(logoutAction());
    }
  };

  if (!isAuthorized) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Login}
              data-testid="sign-in-link"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Favorites}
            data-testid="favorites-link"
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">{userEmail}</span>
            <span className="header__favorite-count">{favorites.length}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            to="#"
            onClick={handleLogoutClick}
            onKeyDown={handleLogoutKeyDown}
            role="button"
            tabIndex={0}
            data-testid="sign-out-link"
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserNavigation;

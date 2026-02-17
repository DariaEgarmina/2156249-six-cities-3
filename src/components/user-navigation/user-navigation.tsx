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

  const handleLogout = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  if (!isAuthorized) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Login}
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
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">{userEmail}</span>
            <span className="header__favorite-count">{favorites.length}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a
            className="header__nav-link"
            href="#"
            onClick={handleLogout}
            onKeyDown={(evt) => {
              if (evt.key === 'Enter' || evt.key === ' ') {
                handleLogout(evt);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default UserNavigation;

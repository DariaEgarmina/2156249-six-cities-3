import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { logoutAction, isAuth, getUserEmail } from '@/store/auth';
import { AppRoute } from '@/const';
// Добавить селектор для favoriteCount позже

function UserNavigation(): JSX.Element {
  const isAuthorized = useAppSelector(isAuth);
  const userEmail = useAppSelector(getUserEmail);
  const dispatch = useAppDispatch();
  // const favoriteCount = useAppSelector(/* селектор для избранного */);

  const handleLogout = () => {
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
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">{userEmail}</span>
            <span className="header__favorite-count">{12}</span>
            {/* Позже использовать вместо числа favoriteCount */}
          </Link>
        </li>
        <li className="header__nav-item">
          <button className="header__nav-link" onClick={handleLogout}>
            <span className="header__signout">Sign out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default UserNavigation;

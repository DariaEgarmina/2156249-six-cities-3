import Logo from '../logo/logo';
import UserNavigation from '../user-navigation/user-navigation';

type HeaderProps = {
  showNavigation?: boolean;
  isAuth?: boolean;
  userEmail?: string;
  favoriteCount?: number;
};

function Header({
  showNavigation = true,
  isAuth = false,
  userEmail,
  favoriteCount
}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" />
          </div>

          {showNavigation && (
            <nav className="header__nav">
              <UserNavigation
                isAuth={isAuth}
                userEmail={userEmail}
                favoriteCount={favoriteCount}
              />
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

import Logo from '../logo/logo';
import UserNavigation from '../user-navigation/user-navigation';

type HeaderProps = {
  showNavigation?: boolean;
};

function Header({ showNavigation = true }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" />
          </div>

          {showNavigation && (
            <nav className="header__nav">
              <UserNavigation />
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

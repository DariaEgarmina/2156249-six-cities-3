import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppSelector } from '@/hooks';
import { getAuthStatus } from '@/store/auth';
import Loading from '../loading/loading';


type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loading />;
  }

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;

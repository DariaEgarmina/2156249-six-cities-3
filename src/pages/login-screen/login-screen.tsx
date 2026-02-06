import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import Header from '@/components/header/header';
import { useAppSelector, useAppDispatch } from '@/hooks';
import {
  isAuth,
  loginAction,
  getIsSubmitting,
  // getAuthError,
} from '@/store/auth';
import { clearAuthError } from '@/store/auth/slice';
import { CITIES, AppRoute } from '@/const';
import { setCity } from '@/store/offers';

function LoginScreen(): JSX.Element {
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(isAuth);
  const isSubmitting = useAppSelector(getIsSubmitting);
  // const error = useAppSelector(getAuthError);

  const randomCity = useMemo(
    () => CITIES[Math.floor(Math.random() * CITIES.length)],
    [],
  );
  const handleRandomCityClick = () => {
    dispatch(setCity(randomCity));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLocalError('');

    const form = evt.currentTarget;
    const formData = new FormData(form);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);

    if (!hasLetter || !hasDigit) {
      setLocalError('Пароль должен содержать хотя бы одну букву и одну цифру');
      return;
    }

    dispatch(loginAction({ email, password }));
  };

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized, navigate]);

  useEffect(
    () => () => {
      dispatch(clearAuthError());
    },
    [dispatch],
  );

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <Header showNavigation={false} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  disabled={isSubmitting}
                />
              </div>
              {localError && (
                <div
                  className="login__error"
                  style={{ color: 'red', marginBottom: '10px' }}
                >
                  {localError}
                </div>
              )}
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={handleRandomCityClick}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;

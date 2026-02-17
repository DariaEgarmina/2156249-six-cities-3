import clsx from 'clsx';
import { useMemo } from 'react';
import { useAppSelector } from '@/hooks';
import Header from '@/components/header/header';
import CitiesTabs from '@/components/cities-tabs/cities-tabs';
import { CITIES } from '@/const';
import SortingForm from '@/components/sorting-form/sorting-form';
import OffersList from '@/components/offers-list/offers-list';
import { City } from '@/types/offer';
import Map from '@/components/map/map';
import MainEmpty from '@/components/main-empty/main-empty';
import { CityCoordinates } from './const';
import { sortOffers } from '@/utils';
import { getCity, getOffers, getActiveSort } from '@/store/offers';

const getCityData = (cityName: (typeof CITIES)[number]): City =>
  CityCoordinates[cityName] || CityCoordinates['Paris'];

function MainScreen(): JSX.Element {
  const activeCity = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const activeSort = useAppSelector(getActiveSort);

  const sortedOffers = useMemo(() => {
    const filteredOffers = offers.filter(
      (offer) => offer.city.name === activeCity,
    );
    return sortOffers(filteredOffers, activeSort);
  }, [offers, activeSort, activeCity]);

  const isEmpty = sortedOffers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main
        className={clsx('page__main', 'page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs cities={CITIES} activeCity={activeCity} />
        <div className="cities">
          <div
            className={clsx('cities__places-container', 'container', {
              'cities__places-container--empty': isEmpty,
            })}
          >
            {isEmpty ? (
              <MainEmpty activeCity={activeCity} />
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {sortedOffers.length}{' '}
                  {sortedOffers.length === 1 ? 'place' : 'places'} to stay in{' '}
                  {activeCity}
                </b>
                <SortingForm currentSort={activeSort} />
                <OffersList offers={sortedOffers} cardType="main" />
              </section>
            )}
            {isEmpty ? (
              <div className="cities__right-section"></div>
            ) : (
              <div className="cities__right-section">
                <Map
                  className="cities__map"
                  city={getCityData(activeCity)}
                  offers={sortedOffers}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;

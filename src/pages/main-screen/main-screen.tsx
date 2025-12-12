import { useState } from 'react';
import clsx from 'clsx';
import { useAppSelector } from '@/hooks';
import Header from '@/components/header/header';
import CitiesTabs from '@/components/cities-tabs/cities-tabs';
import { CITIES } from '@/const';
import SortingForm from '@/components/sorting-form/sorting-form';
import OffersList from '@/components/offers-list/offers-list';
import { City, Offer } from '@/types/offer';
import Map from '@/components/map/map';
import { CityCoordinates } from './const';
import { useAppDispatch } from '@/hooks';
import { SortType } from '@/types/sort';
import { setActiveSort } from '@/store/actions';

const getCityData = (cityName: typeof CITIES[number]): City =>
  CityCoordinates[cityName] || CityCoordinates['Paris'];

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleSortChange = (sort: SortType) => dispatch(setActiveSort(sort));

  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const activeSort = useAppSelector((state) => state.activeSort);

  // const [activeSort, setActiveSort] = useState<SortType>('Popular');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleCardHover = (offer: Offer | null) => {
    setSelectedOffer(offer || null);
  };

  const filteredOffers = offers.filter(
    (offer) => offer.city.name === activeCity
  );

  const isEmpty = filteredOffers.length === 0;

  const selectedOfferId = selectedOffer?.id || null;

  return (
    <div className="page page--gray page--main">
      <Header isAuth userEmail="Oliver.conner@gmail.com" favoriteCount={3} />
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
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in{' '}
                    {activeCity}
                  </p>
                </div>
              </section>
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {filteredOffers.length} places to stay in {activeCity}
                </b>
                <SortingForm
                  currentSort={activeSort}
                  onSortChange={handleSortChange}
                />
                <OffersList
                  offers={filteredOffers}
                  cardType="main"
                  handleCardHover={handleCardHover}
                />
              </section>
            )}
            {isEmpty ? (
              <div className="cities__right-section"></div>
            ) : (
              <div className="cities__right-section">
                <Map
                  className="cities__map"
                  city={getCityData(activeCity)}
                  offers={filteredOffers}
                  selectedOfferId={selectedOfferId}
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

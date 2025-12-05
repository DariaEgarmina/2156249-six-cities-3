import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { setCity } from '@/store/actions';
import Header from '@/components/header/header';
import CitiesTabs from '@/components/cities-tabs/cities-tabs';
import { CITIES } from '@/const';
import SortingForm from '@/components/sorting-form/sorting-form';
import OffersList from '@/components/offers-list/offers-list';
import { City, Offer } from '@/types/offer';
import Map from '@/components/map/map';
import { CityCoordinates } from './const';

const getCityData = (cityName: string): City => CityCoordinates[cityName] || CityCoordinates['Paris'];

function MainScreen(): JSX.Element {
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const dispatch = useAppDispatch();

  const [activeSort, setActiveSort] = useState('Popular');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleCardHover = (offer: Offer | null) => {
    setSelectedOffer(offer || null);
  };

  const filteredOffers = offers.filter(
    (offer) => offer.city.name === activeCity
  );

  const selectedOfferId = selectedOffer?.id || null;

  return (
    <div className="page page--gray page--main">
      <Header isAuth userEmail="Oliver.conner@gmail.com" favoriteCount={3} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs
          cities={CITIES}
          activeCity={activeCity}
          onCityChange={(city) => dispatch(setCity(city))}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffers.length} places to stay in {activeCity}
              </b>
              <SortingForm
                currentSort={activeSort}
                onSortChange={setActiveSort}
              />
              <OffersList
                offers={filteredOffers}
                cardType="main"
                handleCardHover={handleCardHover}
              />
            </section>
            <div className="cities__right-section">
              <Map
                className="cities__map"
                city={getCityData(activeCity)}
                offers={filteredOffers}
                selectedOfferId={selectedOfferId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;

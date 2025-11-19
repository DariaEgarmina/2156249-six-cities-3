import { useState } from 'react';
import Header from '@/components/header/header';
import CitiesTabs from '@/components/cities-tabs/cities-tabs';
import { CITIES } from '@/const';
import SortingForm from '@/components/sorting-form/sorting-form';
import OffersList from '@/components/offers-list/offers-list';
import { Offer } from '@/types/offer';
import Map from '@/components/map/map';

type MainScreenProps = {
  offers: Offer[];
};

function MainScreen({ offers }: MainScreenProps): JSX.Element {
  const [activeCity, setActiveCity] = useState(CITIES[0]);
  const [activeSort, setActiveSort] = useState('Popular');

  return (
    <div className="page page--gray page--main">
      <Header isAuth userEmail="Oliver.conner@gmail.com" favoriteCount={3} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs
          cities={CITIES}
          activeCity={activeCity}
          onCityChange={setActiveCity}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in Amsterdam
              </b>
              <SortingForm
                currentSort={activeSort}
                onSortChange={setActiveSort}
              />
              <OffersList offers={offers} cardType='Main' />
            </section>
            <div className="cities__right-section">
              <Map className='cities__map' />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;

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
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleCardHover = (offer: Offer | null) => {
    setSelectedOffer(offer || null);
  };

  const selectedOfferId = selectedOffer?.id || null;

  //Временное решение для теста
  const amsterdamOffers = offers.filter(
    (offer) => offer.city.name === 'Amsterdam'
  );
  const selectedCity = amsterdamOffers[0]?.city;

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
                {amsterdamOffers.length} places to stay in Amsterdam
              </b>
              <SortingForm
                currentSort={activeSort}
                onSortChange={setActiveSort}
              />
              <OffersList
                offers={amsterdamOffers}
                cardType="main"
                handleCardHover={handleCardHover}
              />
            </section>
            <div className="cities__right-section">
              <Map
                className="cities__map"
                city={selectedCity}
                offers={amsterdamOffers}
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

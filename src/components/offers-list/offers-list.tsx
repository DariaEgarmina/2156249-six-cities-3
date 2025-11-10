import { useState } from 'react';
import PlaceCard from '../place-card/place-card';
import { Offers } from '@/types/offer';

type OffersListProps = {
  offers: Offers;
};

function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          isActive={offer.id === activeOfferId}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        />
      ))}
    </div>
  );
}

export default OffersList;

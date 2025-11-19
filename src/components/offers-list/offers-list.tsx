import { useState } from 'react';
import PlaceCard from '../place-card/place-card';
import { Offer } from '@/types/offer';
import { CardType } from '@/types/card';

type OffersListProps = {
  offers: Offer[];
  cardType: CardType;
};

function OffersList({ offers, cardType }: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          cardType={cardType}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        />
      ))}
    </div>
  );
}

export default OffersList;

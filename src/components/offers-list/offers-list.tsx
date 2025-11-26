import PlaceCard from '../place-card/place-card';
import { Offer } from '@/types/offer';
import { CardType } from '@/types/card';

type OffersListProps = {
  offers: Offer[];
  cardType: CardType;
  handleCardHover: (offer: Offer | null) => void;
};

function OffersList({ offers, cardType, handleCardHover }: OffersListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          cardType={cardType}
          handleCardHover={handleCardHover}
        />
      ))}
    </div>
  );
}

export default OffersList;

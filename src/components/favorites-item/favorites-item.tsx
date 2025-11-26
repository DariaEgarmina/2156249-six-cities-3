import { Offer } from '@/types/offer';
import PlaceCard from '../place-card/place-card';

type FavoritesItemProps = {
  city: string;
  offers: Offer[];
};

function FavoritesItem({ city, offers }: FavoritesItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            cardType="favorites"
          />
        ))}
      </div>
    </li>
  );
}

export default FavoritesItem;

import { Offers } from '@/types/offer';
import FavoriteCard from '../favorite-card/favorite-card';

type FavoritesItemProps = {
  city: string;
  offers: Offers;
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
          <FavoriteCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export default FavoritesItem;

import { Offer } from '@/types/offer';
import FavoritesItem from '../favorites-item/favorites-item';
import { groupByCity } from './utils';

type FavoritesListProps = {
  favorites: Offer[];
};

function FavoritesList({ favorites }: FavoritesListProps): JSX.Element {
  const favoritesByCity = groupByCity(favorites);

  return (
    <ul className="favorites__list">
      {Object.entries(favoritesByCity).map(([city, cityOffers]) => (
        <FavoritesItem key={city} city={city} offers={cityOffers} />
      ))}
    </ul>
  );
}

export default FavoritesList;

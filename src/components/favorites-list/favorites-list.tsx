import { Offer } from '@/types/offer';
import FavoritesItem from '../favorites-item/favorites-item';

type FavoritesListProps = {
  favorites: Offer[];
};

function FavoritesList({ favorites }: FavoritesListProps): JSX.Element {
  const favoritesByCity = favorites.reduce(
    (acc, offer) => {
      const cityName = offer.city.name;

      if (!acc[cityName]) {
        acc[cityName] = [];
      }

      acc[cityName].push(offer);
      return acc;
    },
    {} as Record<string, Offer[]>,
  );

  return (
    <ul className="favorites__list">
      {Object.entries(favoritesByCity).map(([city, cityOffers]) => (
        <FavoritesItem key={city} city={city} offers={cityOffers} />
      ))}
    </ul>
  );
}

export default FavoritesList;

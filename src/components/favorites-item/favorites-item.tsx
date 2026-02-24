import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks';
import { setCity } from '@/store/offers';
import { Offer } from '@/types/offer';
import PlaceCard from '../place-card/place-card';
import { AppRoute } from '@/const';
import { isProperCity } from './utils';

type FavoritesItemProps = {
  city: string;
  offers: Offer[];
};

function FavoritesItem({ city, offers }: FavoritesItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCityClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    if (isProperCity(city)) {
      dispatch(setCity(city));
      navigate(AppRoute.Main);
    }
  };
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to="#"
            onClick={handleCityClick}
          >
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer} cardType="favorites" />
        ))}
      </div>
    </li>
  );
}

export default FavoritesItem;

import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch } from '@/hooks';
import { setCity } from '@/store/offers';
import { CITIES } from '@/const';


type CitiesTabsProps = {
  cities: typeof CITIES;
  activeCity: string;
};

function CitiesTabs({ cities, activeCity }: CitiesTabsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityClick = (city: typeof CITIES[number]) => (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCity(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city} className="locations__item">
              <Link
                className={clsx('locations__item-link tabs__item', {
                  'tabs__item--active': city === activeCity,
                })}
                to="#"
                onClick={handleCityClick(city)}
              >
                <span>{city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesTabs;

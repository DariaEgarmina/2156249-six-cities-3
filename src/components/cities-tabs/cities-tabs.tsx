type CitiesTabsProps = {
  cities: string[];
  activeCity: string;
  onCityChange: (city: string) => void;
};

function CitiesTabs({
  cities,
  activeCity,
  onCityChange,
}: CitiesTabsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${
                  city === activeCity ? 'tabs__item--active' : ''
                }`}
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  onCityChange(city);
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesTabs;

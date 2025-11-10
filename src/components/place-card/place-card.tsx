import { Link } from 'react-router-dom';
import { AppRoute } from '@/const';
import { Offer } from '@/types/offer';

type PlaceCardProps = {
  offer: Offer;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function PlaceCard({
  offer,
  isActive,
  onMouseEnter,
  onMouseLeave,
}: PlaceCardProps): JSX.Element {
  const { title, type, price, isPremium, previewImage } = offer;
  const cardClass = `cities__card place-card ${isActive ? 'place-card--active' : ''}`;

  return (
    <article
      className={cardClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="place-card__mark">
        {isPremium && <span>Premium</span>}
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Offer}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;

import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '@/const';
import { CardConfig } from './const';
import { Offer } from '@/types/offer';
import { CardType } from '@/types/card';
import Badge from '../badge/badge';
import BookmarkButton from '../bookmark-button/bookmark-button';
import { useAppDispatch } from '@/hooks';
import { setSelectedOfferId } from '@/store/offers';
import { formatType } from '@/utils';

type PlaceCardProps = {
  offer: Offer;
  cardType: CardType;
};

function PlaceCard({ offer, cardType }: PlaceCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    id,
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    previewImage,
  } = offer;
  const config = CardConfig[cardType];
  const ratingWidth = `${(rating / 5) * 100}%`;

  return (
    <article
      className={config.cardClass}
      onMouseEnter={() => dispatch(setSelectedOfferId(id))}
      onMouseLeave={() => dispatch(setSelectedOfferId(null))}
    >
      {isPremium && <Badge text="Premium" parentType="card" />}

      <div className={config.imageWrapperClass}>
        <Link to={generatePath(AppRoute.Offer, { id: offer.id })}>
          <img
            className="place-card__image"
            src={previewImage}
            width={config.imageSize.width}
            height={config.imageSize.height}
            alt={title}
          />
        </Link>
      </div>
      <div className={config.infoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>

          <BookmarkButton isFavorite={isFavorite} buttonType="card" />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id: offer.id })}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{formatType(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;

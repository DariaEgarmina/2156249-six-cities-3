import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Reviews } from '@/types/review';
import { FullOffer } from '@/types/offer';
import Header from '@/components/header/header';
import ReviewForm from '@/components/review-form/review-form';
import ReviewsList from '@/components/reviews-list/reviews-list';
import Map from '@/components/map/map';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Badge from '@/components/badge/badge';
import BookmarkButton from '@/components/bookmark-button/bookmark-button';
import PlaceCard from '@/components/place-card/place-card';

type OfferScreenProps = {
  offers: FullOffer[];
  reviews: Reviews;
};

function OfferScreen({ offers, reviews }: OfferScreenProps): JSX.Element {
  const { id } = useParams();

  const offer = offers.find((item) => item.id === id);

  if (!offer) {
    return <NotFoundScreen />;
  }

  const {
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    description,
    bedrooms,
    goods,
    host,
    images,
    maxAdults,
  } = offer;

  const { name, avatarUrl, isPro } = host;

  const ratingWidth = `${(Math.round(rating) / 5) * 100}%`;

  const nearbyOffers = offers
    .filter((item) => item.city.name === offer.city.name && item.id !== offer.id)
    .slice(0, 3);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: {offer.title}</title>
      </Helmet>
      <Header isAuth userEmail="Oliver.conner@gmail.com" favoriteCount={3} />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt={`Photo ${title}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && <Badge text="Premium" parentType="page" />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <BookmarkButton isFavorite={isFavorite} buttonType="page" />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {maxAdults === 1 ? 'adult' : 'adults'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={clsx(
                      'offer__avatar-wrapper',
                      'user__avatar-wrapper',
                      { 'offer__avatar-wrapper--pro': isPro }
                    )}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{name}</span>
                  {isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews ·{' '}
                  <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewsList reviews={reviews} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map className="offer__map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((nearbyOffer) => (
                <PlaceCard
                  key={nearbyOffer.id}
                  offer={nearbyOffer}
                  cardType="Near"
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;

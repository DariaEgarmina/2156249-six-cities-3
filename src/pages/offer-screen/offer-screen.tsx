import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Navigate } from 'react-router-dom';
import clsx from 'clsx';
import Header from '@/components/header/header';
import ReviewForm from '@/components/review-form/review-form';
import ReviewsList from '@/components/reviews-list/reviews-list';
import Map from '@/components/map/map';
import Loading from '@/components/loading/loading';
import Badge from '@/components/badge/badge';
import BookmarkButton from '@/components/bookmark-button/bookmark-button';
import PlaceCard from '@/components/place-card/place-card';
import FullPageError from '@/components/full-page-error/full-page-error';
import { useAppSelector, useAppDispatch } from '@/hooks';
import {
  getOffer,
  getNearbyOffers,
  fetchOfferAction,
  fetchNearbyOffersAction,
  getIsOfferLoading,
  getOfferError,
  getNearbyLoadError,
  clearError,
} from '@/store/offer';
import { getReviews, fetchCommentsAction } from '@/store/reviews';
import { formatType } from '@/utils';
import { AppRoute } from '@/const';
import ErrorPanel from '@/components/error-panel/error-panel';
import { isAuth } from '@/store/auth';

function OfferScreen(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id))
        .unwrap()
        .then(() => {
          dispatch(fetchNearbyOffersAction(id));
          dispatch(fetchCommentsAction(id));
        })
        .catch(() => {});
    }

    return () => {
      dispatch(clearError());
    };
  }, [id, dispatch]);

  const isLoading = useAppSelector(getIsOfferLoading);
  const offer = useAppSelector(getOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);
  const error = useAppSelector(getOfferError);
  const nearbyLoadError = useAppSelector(getNearbyLoadError);
  const isAuthorized = useAppSelector(isAuth);

  if (isLoading) {
    return <Loading />;
  }

  if (error?.includes('404')) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (error || !offer) {
    return <FullPageError error={error} />;
  }

  const selectedOfferId = offer.id || null;

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

  const selectedCity = offer.city;
  const offersForMap = [offer, ...nearbyOffers];

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: {offer.title}</title>
      </Helmet>
      <Header />
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
                <BookmarkButton
                  isFavorite={isFavorite}
                  buttonType="page"
                  offerId={offer.id}
                />
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
                  {formatType(type)}
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
                      { 'offer__avatar-wrapper--pro': isPro },
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
                {isAuthorized ? (
                  <ReviewForm />
                ) : (
                  <div className="reviews__form">
                    <p className="reviews__message" style={{ color: 'red' }}>
                      Only authorized users can leave reviews
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
          <Map
            className="offer__map"
            city={selectedCity}
            offers={offersForMap}
            selectedOfferId={selectedOfferId}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            {nearbyLoadError ? (
              <ErrorPanel message="Failed to load nearby places. Please try again later." />
            ) : (
              <div className="near-places__list places__list">
                {nearbyOffers.map((nearbyOffer) => (
                  <PlaceCard
                    key={nearbyOffer.id}
                    offer={nearbyOffer}
                    cardType="near"
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;

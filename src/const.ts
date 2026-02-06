export const TIMEOUT_SHOW_ERROR = 2000;

export const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
  NotFound: '/404',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export enum APIRoute {
  Offers = '/offers',
  Offer = '/offers/:id',
  Nearby = '/offers/:id/nearby',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments/:offerId',
}

export enum NameSpace {
  Offers = 'OFFERS',
  Offer = 'OFFER',
  Auth = 'AUTH',
  Reviews = 'REVIEWS',
  Favorites = 'FAVORITES',
}

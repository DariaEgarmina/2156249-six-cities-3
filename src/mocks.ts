import { Offer } from './types/offer';

export const makeFakeOffer = (id: string = '1'): Offer => ({
  id: id,
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 100,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: 'img/image.jpg',
});

export const makeFakeOffers = (count: number): Offer[] =>
  Array.from({ length: count }, (_, index) => makeFakeOffer(String(index + 1)));

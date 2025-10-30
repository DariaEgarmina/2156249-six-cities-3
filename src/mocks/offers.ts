import { nanoid } from 'nanoid';
import { Offers } from '../types/offer';

const IMAGE_URL = 'https://22.objects.htmlacademy.pro/static/destinations/';

export const offers: Offers = [
  {
    id: nanoid(),
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      }
    },
    location: {
      latitude: 48.858854,
      longitude: 2.347035,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 5,
    previewImage: `${IMAGE_URL}1.jpg`,
  },
  {
    id: nanoid(),
    title: 'Wood and stone place in Amsterdam',
    type: 'room',
    price: 80,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: `${IMAGE_URL}2.jpg`,
  },
  {
    id: nanoid(),
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 132,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 5,
    previewImage: `${IMAGE_URL}3.jpg`,
  },
  {
    id: nanoid(),
    title: 'Nice, cozy, warm big bed apartment',
    type: 'hotel',
    price: 180,
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      }
    },
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 3,
    previewImage: `${IMAGE_URL}4.jpg`,
  },
];

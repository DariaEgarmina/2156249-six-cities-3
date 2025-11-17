import { nanoid } from 'nanoid';
import { Offers } from '../types/offer';
import { AVATAR_URL } from './reviews';

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
      },
    },
    location: {
      latitude: 48.858854,
      longitude: 2.347035,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    previewImage: `${IMAGE_URL}1.jpg`,
    description:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Paris. The building is green and from 18th century.',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Cable TV', 'Baby seat'],
    host: {
      name: 'Angelina',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: true,
    },
    images: [
      `${IMAGE_URL}20.jpg`,
      `${IMAGE_URL}19.jpg`,
      `${IMAGE_URL}18.jpg`,
      `${IMAGE_URL}17.jpg`,
    ],
    maxAdults: 2,
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
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.9,
    previewImage: `${IMAGE_URL}2.jpg`,
    description:
      'Wood and stone place with a great view of Amsterdam canals. Perfect for romantic getaway.',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Heating', 'Coffee machine', 'Breakfast'],
    host: {
      name: 'Oliver',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false,
    },
    images: [`${IMAGE_URL}16.jpg`, `${IMAGE_URL}15.jpg`, `${IMAGE_URL}14.jpg`],
    maxAdults: 2,
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
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.9,
    previewImage: `${IMAGE_URL}3.jpg`,
    description:
      'Luxurious apartment with direct canal view. Modern design with historical elements.',
    bedrooms: 2,
    goods: [
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Dishwasher',
      'Washing machine',
      'Towels',
    ],
    host: {
      name: 'Angelina',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: true,
    },
    images: [
      `${IMAGE_URL}14.jpg`,
      `${IMAGE_URL}13.jpg`,
      `${IMAGE_URL}12.jpg`,
      `${IMAGE_URL}11.jpg`,
    ],
    maxAdults: 4,
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
      },
    },
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.2,
    previewImage: `${IMAGE_URL}4.jpg`,
    description:
      'Cozy hotel room with big comfortable bed. Located in the heart of Cologne.',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Heating', 'Air conditioning', 'TV', 'Hair dryer'],
    host: {
      name: 'Oliver',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false,
    },
    images: [
      `${IMAGE_URL}10.jpg`,
      `${IMAGE_URL}9.jpg`,
      `${IMAGE_URL}8.jpg`,
      `${IMAGE_URL}7.jpg`,
      `${IMAGE_URL}20.jpg`,
      `${IMAGE_URL}19.jpg`,
      `${IMAGE_URL}18.jpg`,
      `${IMAGE_URL}17.jpg`,
    ],
    maxAdults: 2,
  },
];

import { system, name } from 'faker';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '@/services/api';
import { State } from './store';
import { Offer, FullOffer } from './types/offer';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const makeFakeOffer = (id: string = '1'): Offer => ({
  id: id,
  title: name.title(),
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
  previewImage: system.filePath(),
});

export const makeFakeOffers = (count: number): Offer[] =>
  Array.from({ length: count }, (_, index) => makeFakeOffer(String(index + 1)));

export const makeFakeFullOffer = (id: string = '1'): FullOffer => ({
  ...makeFakeOffer(id),
  description: name.title(),
  bedrooms: 2,
  goods: ['Wi-Fi', 'Kitchen', 'Cable TV'],
  host: {
    name: name.firstName(),
    avatarUrl: system.filePath(),
    isPro: true,
  },
  images: [system.filePath(), system.filePath()],
  maxAdults: 4,
});

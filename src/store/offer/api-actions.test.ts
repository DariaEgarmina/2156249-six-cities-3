import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '@/services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '..';
import { fetchOfferAction, fetchNearbyOffersAction } from './api-actions';
import { APIRoute } from '@/const';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeFullOffer,
  makeFakeOffers,
} from '@/utils/mocks';

describe('Offer async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      offer: {
        offer: null,
        nearbyOffers: [],
        isLoading: false,
        error: null,
        nearbyLoadError: null,
        nearbyToastError: null,
      },
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.fulfilled" when server response 200', async () => {
      const mockOffer = makeFakeFullOffer('1');
      const offerId = '1';
      mockAxiosAdapter
        .onGet(APIRoute.Offer.replace(':id', offerId))
        .reply(200, mockOffer);

      await store.dispatch(fetchOfferAction(offerId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.rejected" when server response 404', async () => {
      const offerId = '1';
      mockAxiosAdapter.onGet(APIRoute.Offer.replace(':id', offerId)).reply(404);

      await store.dispatch(fetchOfferAction(offerId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch "fetchNearbyOffersAction.pending" and "fetchNearbyOffersAction.fulfilled" when server response 200', async () => {
      const mockNearbyOffers = makeFakeOffers(3);
      const offerId = '1';
      mockAxiosAdapter
        .onGet(APIRoute.Nearby.replace(':id', offerId))
        .reply(200, mockNearbyOffers);

      await store.dispatch(fetchNearbyOffersAction(offerId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchNearbyOffersAction.pending" and "fetchNearbyOffersAction.rejected" when server response 404', async () => {
      const offerId = '1';
      mockAxiosAdapter
        .onGet(APIRoute.Nearby.replace(':id', offerId))
        .reply(404);

      await store.dispatch(fetchNearbyOffersAction(offerId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.rejected.type,
      ]);
    });
  });
});

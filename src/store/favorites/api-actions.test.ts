import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '@/services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '..';
import {
  fetchFavoritesAction,
  changeFavoriteStatusAction,
} from './api-actions';
import { APIRoute } from '@/const';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeOffers,
  makeFakeOffer,
} from '@/mocks';

describe('Favorites async actions', () => {
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
      favorites: {
        favorites: [],
        isLoading: false,
        favoritesError: null,
        favoritesToastError: null,
      },
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.fulfilled" when server response 200', async () => {
      const mockFavorites = makeFakeOffers(2);
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(401);

      await store.dispatch(fetchFavoritesAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should dispatch "changeFavoriteStatusAction.pending" and "changeFavoriteStatusAction.fulfilled" when server response 200', async () => {
      const mockOffer = makeFakeOffer('1');
      const payload = { offerId: '1', status: 1 };
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorite}/${payload.offerId}/${payload.status}`)
        .reply(200, mockOffer);

      await store.dispatch(changeFavoriteStatusAction(payload));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type,
      ]);
    });

    it('should dispatch "changeFavoriteStatusAction.pending" and "changeFavoriteStatusAction.rejected" when server response 400', async () => {
      const payload = { offerId: '1', status: 1 };
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorite}/${payload.offerId}/${payload.status}`)
        .reply(400);

      await store.dispatch(changeFavoriteStatusAction(payload));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.rejected.type,
      ]);
    });
  });
});

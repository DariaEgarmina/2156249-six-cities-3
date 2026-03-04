import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '@/services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '..';
import { checkAuthAction, loginAction, logoutAction } from './api-actions';
import { APIRoute } from '@/const';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeUserData,
} from '@/mocks';
import { AuthorizationStatus } from '@/const';
import * as tokenStorage from '@/services/token';

describe('Auth async actions', () => {
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
      auth: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
        isSubmitting: false,
        error: null,
      },
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" when server response 200', async () => {
      const mockUser = makeFakeUserData();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUser);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

      await store.dispatch(checkAuthAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled" when server response 200', async () => {
      const mockUser = makeFakeUserData();
      const fakeUser = { email: 'test@test.ru', password: '123456qwerty' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUser);

      await store.dispatch(loginAction(fakeUser));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const mockUser = makeFakeUserData();
      const fakeUser = { email: 'test@test.ru', password: '123456qwerty' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, mockUser);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(mockUser.token);
    });

    it('should dispatch "loginAction.pending" and "loginAction.rejected" when server response 400', async () => {
      const fakeUser = { email: 'test@test.ru', password: '123456qwerty' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction(fakeUser));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should call "dropToken" once with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});

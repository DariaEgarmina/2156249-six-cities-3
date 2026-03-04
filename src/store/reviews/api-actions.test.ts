import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '@/services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { State } from '..';
import { fetchCommentsAction, postCommentAction } from './api-actions';
import { APIRoute } from '@/const';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeReview,
  makeFakeReviews,
} from '@/mocks';

describe('Reviews async actions', () => {
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
      reviews: {
        reviews: [],
        isLoading: false,
        isSubmitting: false,
        loadError: null,
        submitError: null,
      },
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.fulfilled" when server response 200', async () => {
      const mockReviews = makeFakeReviews(3);
      const offerId = '1';
      mockAxiosAdapter
        .onGet(APIRoute.Comments.replace(':offerId', offerId))
        .reply(200, mockReviews);

      await store.dispatch(fetchCommentsAction(offerId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.rejected" when server response 404', async () => {
      const offerId = '1';
      mockAxiosAdapter
        .onGet(APIRoute.Comments.replace(':offerId', offerId))
        .reply(404);

      await store.dispatch(fetchCommentsAction(offerId));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.rejected.type,
      ]);
    });
  });

  describe('postCommentAction', () => {
    it('should dispatch "postCommentAction.pending" and "postCommentAction.fulfilled" when server response 200', async () => {
      const mockReview = makeFakeReview('1');
      const payload = {
        offerId: '1',
        commentData: {
          comment: 'Good place',
          rating: 5,
        },
      };
      mockAxiosAdapter
        .onPost(APIRoute.Comments.replace(':offerId', payload.offerId))
        .reply(200, mockReview);

      await store.dispatch(postCommentAction(payload));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);
    });

    it('should dispatch "postCommentAction.pending" and "postCommentAction.rejected" when server response 400', async () => {
      const payload = {
        offerId: '1',
        commentData: {
          comment: 'Good place',
          rating: 5,
        },
      };
      mockAxiosAdapter
        .onPost(APIRoute.Comments.replace(':offerId', payload.offerId))
        .reply(400);

      await store.dispatch(postCommentAction(payload));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCommentAction.pending.type,
        postCommentAction.rejected.type,
      ]);
    });
  });
});

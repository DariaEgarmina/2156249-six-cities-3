import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '@/services/api';
import { State } from '@/store';
import { AppThunkDispatch } from './mocks';
import { MockStore } from '@jedmao/redux-mock-store';

export function withHistory(component: JSX.Element) {
  return (
    <MemoryRouter>
      <HelmetProvider>{component}</HelmetProvider>
    </MemoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: (
      <Provider store={mockStore}>
        <MemoryRouter>
          <HelmetProvider>{component}</HelmetProvider>
        </MemoryRouter>
      </Provider>
    ),
    mockStore,
    mockAxiosAdapter,
  };
}

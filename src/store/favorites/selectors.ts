import { State } from '@/store';
import { NameSpace } from '@/const';

export const getFavorites = (state: State) =>
  state[NameSpace.Favorites].favorites;
export const getFavoritesLoading = (state: State) =>
  state[NameSpace.Favorites].isLoading;
export const getFavoritesError = (state: State) =>
  state[NameSpace.Favorites].favoritesError;
export const getFavoritesToastError = (state: State) =>
  state[NameSpace.Favorites].favoritesToastError;

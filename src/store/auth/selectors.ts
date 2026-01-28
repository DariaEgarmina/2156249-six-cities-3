import { State } from '@/store';
import { NameSpace, AuthorizationStatus } from '@/const';

export const getAuthStatus = (state: State) =>
  state[NameSpace.Auth].authorizationStatus;

export const getUserData = (state: State) => state[NameSpace.Auth].userData;

export const getIsSubmitting = (state: State) =>
  state[NameSpace.Auth].isSubmitting;

export const getAuthError = (state: State) => state[NameSpace.Auth].error;

export const isAuth = (state: State) =>
  state[NameSpace.Auth].authorizationStatus === AuthorizationStatus.Auth;

export const getUserEmail = (state: State) =>
  state[NameSpace.Auth].userData?.email;

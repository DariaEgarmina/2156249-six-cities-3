import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';
import { AuthorizationStatus, NameSpace } from '@/const';

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  isSubmitting: false,
  error: null,
};

export const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {

  },
});

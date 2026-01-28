import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './types';
import { AuthorizationStatus, NameSpace } from '@/const';
import { checkAuthAction, loginAction, logoutAction } from './api-actions';
import { UserData } from '@/types/user-data';

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  isSubmitting: false,
  error: null,
};

export const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
        state.error = null;
      })
      .addCase(
        checkAuthAction.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.authorizationStatus = AuthorizationStatus.Auth;
          state.userData = action.payload;
        },
      )
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(loginAction.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(
        loginAction.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.isSubmitting = false;
          state.authorizationStatus = AuthorizationStatus.Auth;
          state.userData = action.payload;
        },
      )
      .addCase(loginAction.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.error.message || 'Не удалось войти';
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;

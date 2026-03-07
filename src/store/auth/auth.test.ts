import { authSlice, clearAuthError } from './slice';
import { checkAuthAction, loginAction, logoutAction } from './api-actions';
import { AuthorizationStatus } from '@/const';
import { makeFakeUserData } from '@/utils/mocks';
import { AuthState } from './types';

describe('authSlice', () => {
  const initialState: AuthState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: null,
    isSubmitting: false,
    error: null,
  };

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = authSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return same state with empty action', () => {
    const emptyAction = { type: '' };
    const result = authSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  describe('reducers', () => {
    it('should clear error with "clearAuthError" action', () => {
      const stateWithError = {
        ...initialState,
        error: 'Some error',
      };

      const result = authSlice.reducer(stateWithError, clearAuthError());

      expect(result.error).toBeNull();
    });
  });

  describe('extra reducers', () => {
    describe('checkAuthAction', () => {
      it('should set authorizationStatus to Unknown and clear error with "checkAuthAction.pending" action', () => {
        const action = { type: checkAuthAction.pending.type };
        const result = authSlice.reducer(initialState, action);

        expect(result.authorizationStatus).toBe(AuthorizationStatus.Unknown);
        expect(result.error).toBeNull();
      });

      it('should set authorizationStatus to Auth and set userData with "checkAuthAction.fulfilled" action', () => {
        const mockUser = makeFakeUserData();
        const action = {
          type: checkAuthAction.fulfilled.type,
          payload: mockUser,
        };
        const result = authSlice.reducer(initialState, action);

        expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
        expect(result.userData).toEqual(mockUser);
      });

      it('should set authorizationStatus to NoAuth and clear userData with "checkAuthAction.rejected" action', () => {
        const action = { type: checkAuthAction.rejected.type };
        const result = authSlice.reducer(initialState, action);

        expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
        expect(result.userData).toBeNull();
      });
    });

    describe('loginAction', () => {
      it('should set isSubmitting to true and clear error with "loginAction.pending" action', () => {
        const action = { type: loginAction.pending.type };
        const result = authSlice.reducer(initialState, action);

        expect(result.isSubmitting).toBe(true);
        expect(result.error).toBeNull();
      });

      it('should set isSubmitting to false, authorizationStatus to Auth and set userData with "loginAction.fulfilled" action', () => {
        const mockUser = makeFakeUserData();
        const action = {
          type: loginAction.fulfilled.type,
          payload: mockUser,
        };
        const result = authSlice.reducer(initialState, action);

        expect(result.isSubmitting).toBe(false);
        expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
        expect(result.userData).toEqual(mockUser);
      });

      it('should set isSubmitting to false and set error with "loginAction.rejected" action', () => {
        const errorMessage = 'Wrong email or password';
        const action = {
          type: loginAction.rejected.type,
          error: { message: '401' },
        };
        const result = authSlice.reducer(initialState, action);

        expect(result.isSubmitting).toBe(false);
        expect(result.error).toBe(errorMessage);
      });
    });

    describe('logoutAction', () => {
      it('should set authorizationStatus to NoAuth, clear userData and error with "logoutAction.fulfilled" action', () => {
        const stateWithAuth = {
          ...initialState,
          authorizationStatus: AuthorizationStatus.Auth,
          userData: makeFakeUserData(),
        };

        const action = { type: logoutAction.fulfilled.type };
        const result = authSlice.reducer(stateWithAuth, action);

        expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
        expect(result.userData).toBeNull();
        expect(result.error).toBeNull();
      });
    });
  });
});

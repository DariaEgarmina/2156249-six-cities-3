import { authSlice, clearAuthError } from './slice';
import { AuthorizationStatus } from '@/const';

describe('authSlice', () => {
  const initialState = {
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
});

import { AuthErrorMessages } from './const';

export const getAuthErrorMessage = (errorMessage: string): string => {
  if (errorMessage.includes('401')) {
    return AuthErrorMessages.Unauthorized;
  }

  if (errorMessage.includes('404')) {
    return AuthErrorMessages.NotFound;
  }

  if (errorMessage.includes('400')) {
    return AuthErrorMessages.BadRequest;
  }

  if (
    errorMessage.includes('Network Error') ||
    errorMessage.includes('ERR_NETWORK')
  ) {
    return AuthErrorMessages.NetworkError;
  }

  if (errorMessage.includes('5')) {
    return AuthErrorMessages.ServerError;
  }

  return AuthErrorMessages.Default;
};

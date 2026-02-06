import { AuthErrorMessages } from './const';

export const getAuthErrorMessage = (errorMessage: string): string => {
  if (errorMessage.includes('401')) {
    return AuthErrorMessages.UNAUTHORIZED;
  }

  if (errorMessage.includes('404')) {
    return AuthErrorMessages.NOT_FOUND;
  }

  if (errorMessage.includes('400')) {
    return AuthErrorMessages.BAD_REQUEST;
  }

  if (
    errorMessage.includes('Network Error') ||
    errorMessage.includes('ERR_NETWORK')
  ) {
    return AuthErrorMessages.NETWORK_ERROR;
  }

  if (errorMessage.includes('5')) {
    return AuthErrorMessages.SERVER_ERROR;
  }

  return AuthErrorMessages.DEFAULT;
};

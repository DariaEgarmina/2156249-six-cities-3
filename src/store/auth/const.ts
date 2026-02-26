export const AuthErrorMessages = {
  Unauthorized: 'Wrong email or password',
  NotFound: 'Authorization server unavailable, please try again later',
  BadRequest: 'Invalid login data',
  NetworkError: 'Connection problems. Check your internet',
  ServerError: 'Server error. Please try again later',
  Default: 'Failed to login. Please try again',
} as const;

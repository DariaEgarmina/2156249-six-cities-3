export const AuthErrorMessages = {
  UNAUTHORIZED: 'Wrong email or password',
  NOT_FOUND: 'Authorization server unavailable, please try again later',
  BAD_REQUEST: 'Invalid login data',
  NETWORK_ERROR: 'Connection problems. Check your internet',
  SERVER_ERROR: 'Server error. Please try again later',
  DEFAULT: 'Failed to login. Please try again',
} as const;

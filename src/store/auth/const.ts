export const AuthErrorMessages = {
  UNAUTHORIZED: 'Неверный email или пароль',
  NOT_FOUND: 'Сервер авторизации недоступен, попробуйте позже',
  BAD_REQUEST: 'Неверные данные для входа',
  NETWORK_ERROR: 'Проблемы с соединением. Проверьте интернет',
  SERVER_ERROR: 'Ошибка сервера. Попробуйте позже',
  DEFAULT: 'Не удалось войти. Попробуйте снова',
} as const;

import { AuthorizationStatus } from '@/const';
import { UserData } from '@/types/user-data';

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  isSubmitting: boolean;
  error: string | null;
};

import { Action } from 'interfaces/common';

export const AUTHENTICATION_CHANGE_PASSWORD_SUCCESS = 'AUTHENTICATION_CHANGE_PASSWORD_SUCCESS';
export const AUTHENTICATION_CHANGE_PASSWORD_FAILED = 'AUTHENTICATION_CHANGE_PASSWORD_FAILED';

export function LoginPassword(state: { success: boolean } | null = null, action: Action<null>) {
  switch (action.type) {
    case AUTHENTICATION_CHANGE_PASSWORD_SUCCESS:
      return {
        success: true,
      };
    case AUTHENTICATION_CHANGE_PASSWORD_FAILED:
      return {
        success: false,
      };
    default:
      return state;
  }
}

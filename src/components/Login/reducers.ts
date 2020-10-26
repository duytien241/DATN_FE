import { Action, Obj } from 'interfaces/common';

export const AUTHENTICATION_LOGIN_SUCCESS = 'AUTHENTICATION_LOGIN_SUCCESS';
export const AUTHENTICATION_LOGIN_FAILED = 'AUTHENTICATION_LOGIN_FAILED';

export const AUTHENTICATION_LOG_OUT_SUCCESS = 'AUTHENTICATION_LOG_OUT_SUCCESS';
export const AUTHENTICATION_LOG_OUT_FAILED = 'AUTHENTICATION_LOG_OUT_FAILED';

export function UserLogin(state: Obj | null = null, action: Action<null>) {
  switch (action.type) {
    case AUTHENTICATION_LOGIN_SUCCESS:
      return action.payload;
    case AUTHENTICATION_LOG_OUT_SUCCESS:
      return null;
    default:
      return state;
  }
}

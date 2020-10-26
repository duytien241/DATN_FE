import { Action, Obj } from 'interfaces/common';

export const AUTHENTICATION_REGISTER_SUCCESS = 'AUTHENTICATION_REGISTER_SUCCESS';
export const AUTHENTICATION_REGISTER_FAILED = 'AUTHENTICATION_REGISTER_FAILED';

export function ShopRegisterResult(state: Obj | null = null, action: Action<null>) {
  switch (action.type) {
    case AUTHENTICATION_REGISTER_SUCCESS:
      return action.payload;
    case AUTHENTICATION_REGISTER_FAILED:
      return null;
    default:
      return state;
  }
}

export const USER_UPDATE_INFO_USER_SUCCESS = 'USER_UPDATE_INFO_USER_SUCCESS';
export const USER_UPDATE_INFO_USER_FAILED = 'USER_UPDATE_INFO_USER_FAILED';

export function ShopUpdateInfoResult(state: Obj | null = null, action: Action<null>) {
  switch (action.type) {
    case USER_UPDATE_INFO_USER_SUCCESS:
      return action.payload;
    case USER_UPDATE_INFO_USER_FAILED:
      return null;
    default:
      return state;
  }
}

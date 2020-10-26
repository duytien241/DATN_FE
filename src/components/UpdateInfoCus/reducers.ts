import { Action, Obj } from 'interfaces/common';

export const USER_QUERY_CUS_INFO_SUCCESS = 'USER_QUERY_CUS_INFO_SUCCESS';
export const USER_QUERY_CUS_INFO_FAILED = 'USER_QUERY_CUS_INFO_FAILED';

export function CusInfo(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case USER_QUERY_CUS_INFO_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const USER_UPDATE_INFO_CUS_SUCCESS = 'USER_UPDATE_INFO_CUS_SUCCESS';
export const USER_UPDATE_INFO_CUS_FAILED = 'USER_UPDATE_INFO_CUS_FAILED';

export function UpdateCusInfoResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case USER_UPDATE_INFO_CUS_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

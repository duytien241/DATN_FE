import { Action, Obj } from 'interfaces/common';

export const ADMIN_QUERY_ADMIN_INFO_SUCCESS = 'ADMIN_QUERY_ADMIN_INFO_SUCCESS';
export const ADMIN_QUERY_ADMIN_INFO_FAILED = 'ADMIN_QUERY_ADMIN_INFO_FAILED';

export function AdminInfo(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case ADMIN_QUERY_ADMIN_INFO_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

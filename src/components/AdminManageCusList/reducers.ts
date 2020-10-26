import { Action, Obj } from 'interfaces/common';

export const QUERY_CUS_LIST_SUCCESS = 'QUERY_CUS_LIST_SUCCESS';
export const QUERY_CUS_LIST_FAILED = 'QUERY_CUS_LIST_FAILED';

export function CusList(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case QUERY_CUS_LIST_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

export const ADMIN_DELETE_CUS_SUCCESS = 'ADMIN_DELETE_CUS_SUCCESS';
export const ADMIN_DELETE_CUS_FAILED = 'ADMIN_DELETE_CUS_FAILED';

export function DeleteCusResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case ADMIN_DELETE_CUS_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

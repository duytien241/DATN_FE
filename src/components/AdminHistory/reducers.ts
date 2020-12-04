import { Action, Obj } from 'interfaces/common';

export const QUERY_HISTORY_SUCCESS = 'QUERY_HISTORY_SUCCESS';
export const QUERY_HISTORY_FAILED = 'QUERY_HISTORY_FAILED';

export function HistoryList(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case QUERY_HISTORY_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

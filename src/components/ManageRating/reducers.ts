import { Action, Obj } from 'interfaces/common';

export const USER_QUERY_RATING_LIST_SUCCESS = 'USER_QUERY_RATING_LIST_SUCCESS';
export const USER_QUERY_RATING_LIST_FAILED = 'USER_QUERY_RATING_LIST_FAILED';

export function RatingList(state: Obj | null = null, action: Action<null>) {
  switch (action.type) {
    case USER_QUERY_RATING_LIST_SUCCESS:
      return action.payload;
    case USER_QUERY_RATING_LIST_FAILED:
      return null;
    default:
      return state;
  }
}

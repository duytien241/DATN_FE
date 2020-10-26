import { USER_QUERY_RATING_LIST } from 'redux-saga/actions';
import { USER_QUERY_RATING_LIST_FAILED, USER_QUERY_RATING_LIST_SUCCESS } from './reducers';

export const queryRatingList = (data?: any) => ({
  type: USER_QUERY_RATING_LIST,
  data,
  response: {
    success: USER_QUERY_RATING_LIST_SUCCESS,
    failed: USER_QUERY_RATING_LIST_FAILED,
  },
});

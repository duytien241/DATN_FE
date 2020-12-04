import { QUERY_HISTORY } from 'redux-saga/actions';
import { QUERY_HISTORY_SUCCESS, QUERY_HISTORY_FAILED } from './reducers';

export const queryHistory = (data?: any) => ({
  type: QUERY_HISTORY,
  data,
  response: {
    success: QUERY_HISTORY_SUCCESS,
    failed: QUERY_HISTORY_FAILED,
  },
});

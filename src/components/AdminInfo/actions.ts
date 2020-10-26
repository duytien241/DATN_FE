import { ADMIN_QUERY_ADMIN_INFO } from 'redux-saga/actions';
import { ADMIN_QUERY_ADMIN_INFO_FAILED, ADMIN_QUERY_ADMIN_INFO_SUCCESS } from './reducers';

export const queryAdminInfo = (data?: any) => ({
  type: ADMIN_QUERY_ADMIN_INFO,
  data,
  response: {
    success: ADMIN_QUERY_ADMIN_INFO_SUCCESS,
    failed: ADMIN_QUERY_ADMIN_INFO_FAILED,
  },
});

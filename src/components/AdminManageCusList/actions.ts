import { ADMIN_DELETE_CUS, QUERY_CUS_LIST } from 'redux-saga/actions';
import {
  ADMIN_DELETE_CUS_FAILED,
  ADMIN_DELETE_CUS_SUCCESS,
  QUERY_CUS_LIST_FAILED,
  QUERY_CUS_LIST_SUCCESS,
} from './reducers';

export const queryCusList = (data?: any) => ({
  type: QUERY_CUS_LIST,
  data,
  response: {
    success: QUERY_CUS_LIST_SUCCESS,
    failed: QUERY_CUS_LIST_FAILED,
  },
});

export const deleteCus = (data: any) => ({
  type: ADMIN_DELETE_CUS,
  data,
  response: {
    success: ADMIN_DELETE_CUS_SUCCESS,
    failed: ADMIN_DELETE_CUS_FAILED,
  },
});

import { USER_QUERY_CUS_INFO, USER_UPDATE_INFO_CUS } from 'redux-saga/actions';
import {
  USER_QUERY_CUS_INFO_FAILED,
  USER_QUERY_CUS_INFO_SUCCESS,
  USER_UPDATE_INFO_CUS_SUCCESS,
  USER_UPDATE_INFO_CUS_FAILED,
} from './reducers';

export const queryCusInfo = (data?: any) => ({
  type: USER_QUERY_CUS_INFO,
  data,
  response: {
    success: USER_QUERY_CUS_INFO_SUCCESS,
    failed: USER_QUERY_CUS_INFO_FAILED,
  },
});

export const updateCusInfo = (data: any) => ({
  type: USER_UPDATE_INFO_CUS,
  data,
  response: {
    success: USER_UPDATE_INFO_CUS_SUCCESS,
    failed: USER_UPDATE_INFO_CUS_FAILED,
  },
});

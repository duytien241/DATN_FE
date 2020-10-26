import { SALE_QUERY_SALE_TYPE, SALE_CREATE_SALE_CODE, SALE_QUERY_SALE_CODE_LIST } from 'redux-saga/actions';
import {
  SALE_CREATE_SALE_CODE_SUCCESS,
  SALE_CREATE_SALE_CODE_FAILED,
  SALE_QUERY_SALE_CODE_LIST_SUCCESS,
  SALE_QUERY_SALE_CODE_LIST_FAILED,
  SALE_QUERY_SALE_TYPE_FAILED,
  SALE_QUERY_SALE_TYPE_SUCCESS,
} from './reducers';

export const querySaleType = (data?: any) => ({
  type: SALE_QUERY_SALE_TYPE,
  data,
  response: {
    success: SALE_QUERY_SALE_TYPE_SUCCESS,
    failed: SALE_QUERY_SALE_TYPE_FAILED,
  },
});

export const querySaleCodeList = (data?: any) => ({
  type: SALE_QUERY_SALE_CODE_LIST,
  data,
  response: {
    success: SALE_QUERY_SALE_CODE_LIST_SUCCESS,
    failed: SALE_QUERY_SALE_CODE_LIST_FAILED,
  },
});

export const createSaleCode = (data: any) => ({
  type: SALE_CREATE_SALE_CODE,
  data,
  response: {
    success: SALE_CREATE_SALE_CODE_SUCCESS,
    failed: SALE_CREATE_SALE_CODE_FAILED,
  },
});

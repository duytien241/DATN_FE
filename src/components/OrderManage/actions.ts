import {
  ORDER_QUERY_ORDER_DETAIL,
  ORDER_QUERY_ORDER,
  ORDER_UPDATE_ORDER,
  ORDER_QUERY_ORDER_STATUS,
} from 'redux-saga/actions';
import {
  ORDER_QUERY_ORDER_FAILED,
  ORDER_QUERY_ORDER_SUCCESS,
  ORDER_UPDATE_ORDER_FAILED,
  ORDER_UPDATE_ORDER_SUCCESS,
  ORDER_QUERY_ORDER_STATUS_SUCCESS,
  ORDER_QUERY_ORDER_STATUS_FAILED,
  ORDER_QUERY_ORDER_DETAIL_SUCCESS,
  ORDER_QUERY_ORDER_DETAIL_FAILED,
} from './reducers';

export const queryOrderShop = (data: any) => ({
  type: ORDER_QUERY_ORDER,
  data,
  response: {
    success: ORDER_QUERY_ORDER_SUCCESS,
    failed: ORDER_QUERY_ORDER_FAILED,
  },
});

export const queryOrderDetail = (data: any) => ({
  type: ORDER_QUERY_ORDER_DETAIL,
  data,
  response: {
    success: ORDER_QUERY_ORDER_DETAIL_SUCCESS,
    failed: ORDER_QUERY_ORDER_DETAIL_FAILED,
  },
});

export const updateOrderShop = (data: any) => ({
  type: ORDER_UPDATE_ORDER,
  data,
  response: {
    success: ORDER_UPDATE_ORDER_SUCCESS,
    failed: ORDER_UPDATE_ORDER_FAILED,
  },
});

export const queryOrderStatus = (data?: any) => ({
  type: ORDER_QUERY_ORDER_STATUS,
  data,
  response: {
    success: ORDER_QUERY_ORDER_STATUS_SUCCESS,
    failed: ORDER_QUERY_ORDER_STATUS_FAILED,
  },
});

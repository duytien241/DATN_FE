import { ADMIN_DECISION_SHOP_REGISTER, ADMIN_QUERY_SHOP_PENDING_LIST } from 'redux-saga/actions';
import {
  ADMIN_DECISION_SHOP_REGISTER_FAILED,
  ADMIN_DECISION_SHOP_REGISTER_SUCCESS,
  ADMIN_QUERY_SHOP_PENDING_LIST_FAILED,
  ADMIN_QUERY_SHOP_PENDING_LIST_SUCCESS,
} from './reducers';

export const queryShopPendingList = (data?: any) => ({
  type: ADMIN_QUERY_SHOP_PENDING_LIST,
  data,
  response: {
    success: ADMIN_QUERY_SHOP_PENDING_LIST_SUCCESS,
    failed: ADMIN_QUERY_SHOP_PENDING_LIST_FAILED,
  },
});

export const decisionShopRegister = (data: any) => ({
  type: ADMIN_DECISION_SHOP_REGISTER,
  data,
  response: {
    success: ADMIN_DECISION_SHOP_REGISTER_SUCCESS,
    failed: ADMIN_DECISION_SHOP_REGISTER_FAILED,
  },
});

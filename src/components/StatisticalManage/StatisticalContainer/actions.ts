import { STATISTICAL_QUERY_ORDER_SHOP } from 'redux-saga/actions';
import { STATISTICAL_QUERY_ORDER_SHOP_FAILED, STATISTICAL_QUERY_ORDER_SHOP_SUCCESS } from './reducers';

export const queryStatisticalOrder = (data: any) => ({
  type: STATISTICAL_QUERY_ORDER_SHOP,
  data,
  response: {
    success: STATISTICAL_QUERY_ORDER_SHOP_SUCCESS,
    failed: STATISTICAL_QUERY_ORDER_SHOP_FAILED,
  },
});

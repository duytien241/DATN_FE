import { PLACE_ORDER } from 'redux-saga/actions';
import { PLACE_ORDER_FAILURE, PLACE_ORDER_SUCCESS } from './reducers';

export const placeOrder = (data?: any) => ({
  type: PLACE_ORDER,
  data,
  response: {
    success: PLACE_ORDER_SUCCESS,
    failed: PLACE_ORDER_FAILURE,
  },
});

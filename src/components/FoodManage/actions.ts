import { FOOD_CHANGE_FOOD_STATUS } from 'redux-saga/actions';
import { FOOD_CHANGE_FOOD_STATUS_SUCCESS, FOOD_CHANGE_FOOD_STATUS_FAILED } from './reducers';

export const changeStatusFood = (data: any) => ({
  type: FOOD_CHANGE_FOOD_STATUS,
  data,
  response: {
    success: FOOD_CHANGE_FOOD_STATUS_SUCCESS,
    failed: FOOD_CHANGE_FOOD_STATUS_FAILED,
  },
});

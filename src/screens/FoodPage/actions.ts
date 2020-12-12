import { QUERY_FOOD_NAME_SEARCH } from 'redux-saga/actions';
import { QUERY_FOOD_NAME_SEARCH_FAILED, QUERY_FOOD_NAME_SEARCH_SUCCESS } from './reducers';

export const searchFoodName = (data?: any) => ({
  type: QUERY_FOOD_NAME_SEARCH,
  data,
  response: {
    success: QUERY_FOOD_NAME_SEARCH_SUCCESS,
    failed: QUERY_FOOD_NAME_SEARCH_FAILED,
  },
});

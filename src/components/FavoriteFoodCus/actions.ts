import { FOOD_DELETE_FAVORITE_FOOD_LIST, FOOD_QUERY_FAVORITE_FOOD_LIST } from 'redux-saga/actions';
import {
  FOOD_QUERY_FAVORITE_FOOD_LIST_SUCCESS,
  FOOD_QUERY_FAVORITE_FOOD_LIST_FAILED,
  FOOD_DELETE_FAVORITE_FOOD_LIST_SUCCESS,
  FOOD_DELETE_FAVORITE_FOOD_LIST_FAILED,
} from './reducers';
export const queryFoodFavoriteList = (data?: any) => ({
  type: FOOD_QUERY_FAVORITE_FOOD_LIST,
  data,
  response: {
    success: FOOD_QUERY_FAVORITE_FOOD_LIST_SUCCESS,
    failed: FOOD_QUERY_FAVORITE_FOOD_LIST_FAILED,
  },
});

export const deleteFoodFavoriteItem = (data: any) => ({
  type: FOOD_DELETE_FAVORITE_FOOD_LIST,
  data,
  response: {
    success: FOOD_DELETE_FAVORITE_FOOD_LIST_SUCCESS,
    failed: FOOD_DELETE_FAVORITE_FOOD_LIST_FAILED,
  },
});

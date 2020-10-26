import {
  FOOD_CREATE_FOOD,
  FOOD_QUERY_FOOD_LIST,
  FOOD_UPDATE_FOOD,
  USER_QUERY_SHOP_TYPE,
  USER_QUERY_SHOP_INFO,
  GLOBAL_QUERY_LOCATION,
  GLOBAL_QUERY_SHOP_LIST,
  FOOD_QUERY_FOOD_TYPE,
  COMMENT,
  ORDER_FOOD,
  DELETE_FOOD,
  FOOD_DELETE_FOOD_MANAGE,
} from 'redux-saga/actions';
import {
  FOOD_CREATE_FOOD_FAILED,
  FOOD_CREATE_FOOD_SUCCESS,
  FOOD_QUERY_FOOD_LIST_FAILED,
  FOOD_QUERY_FOOD_LIST_SUCCESS,
  FOOD_UPDATE_FOOD_FAILED,
  FOOD_UPDATE_FOOD_SUCCESS,
  USER_QUERY_SHOP_TYPE_SUCCESS,
  USER_QUERY_SHOP_TYPE_FAILED,
  USER_QUERY_SHOP_INFO_SUCCESS,
  USER_QUERY_SHOP_INFO_FAILED,
  GLOBAL_QUERY_LOCATION_SUCCESS,
  GLOBAL_QUERY_LOCATION_FAILED,
  GLOBAL_QUERY_SHOP_LIST_SUCCESS,
  GLOBAL_QUERY_SHOP_LIST_FAILED,
  FOOD_QUERY_FOOD_TYPE_SUCCESS,
  FOOD_QUERY_FOOD_TYPE_FAILED,
  COMMENT_SUCCESS,
  COMMENT_FAILED,
  ORDER_SUCCESS,
  ORDER_FAILURE,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  FOOD_DELETE_FOOD_MANAGE_SUCCESS,
  FOOD_DELETE_FOOD_MANAGE_FAILED,
} from './reducers';

export const queryFoodList = (data?: any) => ({
  type: FOOD_QUERY_FOOD_LIST,
  data,
  response: {
    success: FOOD_QUERY_FOOD_LIST_SUCCESS,
    failed: FOOD_QUERY_FOOD_LIST_FAILED,
  },
});

export const createFood = (data: any) => ({
  type: FOOD_CREATE_FOOD,
  data,
  response: {
    success: FOOD_CREATE_FOOD_SUCCESS,
    failed: FOOD_CREATE_FOOD_FAILED,
  },
});

export const updateFood = (data: any) => ({
  type: FOOD_UPDATE_FOOD,
  data,
  response: {
    success: FOOD_UPDATE_FOOD_SUCCESS,
    failed: FOOD_UPDATE_FOOD_FAILED,
  },
});

export const deleteFoodManage = (data: any) => ({
  type: FOOD_DELETE_FOOD_MANAGE,
  data,
  response: {
    success: FOOD_DELETE_FOOD_MANAGE_SUCCESS,
    failed: FOOD_DELETE_FOOD_MANAGE_FAILED,
  },
});

export const queryShopType = (data?: any) => ({
  type: USER_QUERY_SHOP_TYPE,
  data,
  response: {
    success: USER_QUERY_SHOP_TYPE_SUCCESS,
    failed: USER_QUERY_SHOP_TYPE_FAILED,
  },
});

export const queryShopInfo = (data?: any) => ({
  type: USER_QUERY_SHOP_INFO,
  data,
  response: {
    success: USER_QUERY_SHOP_INFO_SUCCESS,
    failed: USER_QUERY_SHOP_INFO_FAILED,
  },
});

export const queryLocation = (data?: any) => ({
  type: GLOBAL_QUERY_LOCATION,
  data,
  response: {
    success: GLOBAL_QUERY_LOCATION_SUCCESS,
    failed: GLOBAL_QUERY_LOCATION_FAILED,
  },
});

export const queryShopList = (data?: any) => ({
  type: GLOBAL_QUERY_SHOP_LIST,
  data,
  response: {
    success: GLOBAL_QUERY_SHOP_LIST_SUCCESS,
    failed: GLOBAL_QUERY_SHOP_LIST_FAILED,
  },
});

export const queryFoodType = (data?: any) => ({
  type: FOOD_QUERY_FOOD_TYPE,
  data,
  response: {
    success: FOOD_QUERY_FOOD_TYPE_SUCCESS,
    failed: FOOD_QUERY_FOOD_TYPE_FAILED,
  },
});

export const comment = (data?: any) => ({
  type: COMMENT,
  action: 'COMMENT',
  data,
  response: {
    success: COMMENT_SUCCESS,
    failed: COMMENT_FAILED,
  },
});

export const orderFood = (data?: any) => ({
  type: ORDER_FOOD,
  action: 'ORDER_FOOD',
  data,
  response: {
    success: ORDER_SUCCESS,
    failed: ORDER_FAILURE,
  },
});

export const deleteFood = (data?: any) => ({
  type: DELETE_FOOD,
  action: 'DELETE_FOOD',
  data,
  response: {
    success: DELETE_SUCCESS,
    failed: DELETE_FAILURE,
  },
});

import {
  FOOD_CREATE_FOOD,
  FOOD_QUERY_FOOD_LIST,
  FOOD_UPDATE_FOOD,
  USER_QUERY_SHOP_TYPE,
  USER_QUERY_SHOP_INFO,
  GLOBAL_QUERY_LOCATION,
  GLOBAL_QUERY_SHOP_LIST,
  FOOD_QUERY_FOOD_TYPE,
  QUERY_COMMENT,
  REQUEST_COMMENT,
  REQUEST_RATING,
  QUERY_RATING,
  ORDER_FOOD,
  DELETE_FOOD,
  FOOD_DELETE_FOOD_MANAGE,
  FOOD_QUERY_FOOD_DETAIL,
  FOOD_QUERY_FOOD_LIST_CATEGORY,
  SHOP_QUERY_SHOP_LIST_CATEGORY,
  QUERY_LIST_CATEGORY,
  QUERY_LIST_DISTRICT,
  QUERY_INFO_ACCOUNT,
  QUERY_RESULT_FILTER,
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
  QUERY_COMMENT_SUCCESS,
  QUERY_COMMENT_FAILED,
  ORDER_SUCCESS,
  ORDER_FAILURE,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  FOOD_DELETE_FOOD_MANAGE_SUCCESS,
  FOOD_DELETE_FOOD_MANAGE_FAILED,
  COMMENT_RESULT_SUCCESS,
  COMMENT_RESULT_FAILED,
  QUERY_RATING_SUCCESS,
  QUERY_RATING_FAILED,
  REQUEST_RATING_SUCCESS,
  REQUEST_RATING_FAILED,
  FOOD_QUERY_FOOD_DETAIL_SUCCESS,
  FOOD_QUERY_FOOD_DETAIL_FAILED,
  FOOD_QUERY_FOOD_LIST_CATEGORY_SUCCESS,
  FOOD_QUERY_FOOD_LIST_CATEGORY_FAILED,
  SHOP_QUERY_SHOP_LIST_CATEGORY_SUCCESS,
  SHOP_QUERY_SHOP_LIST_CATEGORY_FAILED,
  QUERY_LIST_CATEGORY_SUCCESS,
  QUERY_LIST_CATEGORY_FAILED,
  QUERY_LIST_DISTRICT_SUCCESS,
  QUERY_LIST_DISTRICT_FAILED,
  QUERY_INFO_ACCOUNT_SUCCESS,
  QUERY_INFO_ACCOUNT_FAILED,
  QUERY_RESULT_FILTER_FAILED,
  QUERY_RESULT_FILTER_SUCCESS,
} from './reducers';

export const queryFoodList = (data?: any) => ({
  type: FOOD_QUERY_FOOD_LIST,
  data,
  response: {
    success: FOOD_QUERY_FOOD_LIST_SUCCESS,
    failed: FOOD_QUERY_FOOD_LIST_FAILED,
  },
});

export const queryFoodListByCategoty = (data?: any) => ({
  type: FOOD_QUERY_FOOD_LIST_CATEGORY,
  data,
  response: {
    success: FOOD_QUERY_FOOD_LIST_CATEGORY_SUCCESS,
    failed: FOOD_QUERY_FOOD_LIST_CATEGORY_FAILED,
  },
});

export const queryFoodDetail = (data?: any) => ({
  type: FOOD_QUERY_FOOD_DETAIL,
  data,
  response: {
    success: FOOD_QUERY_FOOD_DETAIL_SUCCESS,
    failed: FOOD_QUERY_FOOD_DETAIL_FAILED,
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

export const queryShopInfo = (data?: any) => {
  return {
    type: USER_QUERY_SHOP_INFO,
    data,
    response: {
      success: USER_QUERY_SHOP_INFO_SUCCESS,
      failed: USER_QUERY_SHOP_INFO_FAILED,
    },
  };
};

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

export const queryComment = (data?: any) => ({
  type: QUERY_COMMENT,
  data,
  response: {
    success: QUERY_COMMENT_SUCCESS,
    failed: QUERY_COMMENT_FAILED,
  },
});

export const comment = (data?: any) => ({
  type: REQUEST_COMMENT,
  data,
  response: {
    success: COMMENT_RESULT_SUCCESS,
    failed: COMMENT_RESULT_FAILED,
  },
});

export const queryRating = (data?: any) => ({
  type: QUERY_RATING,
  data,
  response: {
    success: QUERY_RATING_SUCCESS,
    failed: QUERY_RATING_FAILED,
  },
});

export const rating = (data?: any) => ({
  type: REQUEST_RATING,
  data,
  response: {
    success: REQUEST_RATING_SUCCESS,
    failed: REQUEST_RATING_FAILED,
  },
});

export const orderFood = (data?: any) => ({
  type: ORDER_FOOD,
  data,
  response: {
    success: ORDER_SUCCESS,
    failed: ORDER_FAILURE,
  },
});

export const deleteFood = (data?: any) => ({
  type: DELETE_FOOD,
  data,
  response: {
    success: DELETE_SUCCESS,
    failed: DELETE_FAILURE,
  },
});

export const queryShopListCategory = (data?: any) => ({
  type: SHOP_QUERY_SHOP_LIST_CATEGORY,
  data,
  response: {
    success: SHOP_QUERY_SHOP_LIST_CATEGORY_SUCCESS,
    failed: SHOP_QUERY_SHOP_LIST_CATEGORY_FAILED,
  },
});

export const queryListCategory = (data?: any) => ({
  type: QUERY_LIST_CATEGORY,
  data,
  response: {
    success: QUERY_LIST_CATEGORY_SUCCESS,
    failed: QUERY_LIST_CATEGORY_FAILED,
  },
});

export const queryListDistrict = (data?: any) => ({
  type: QUERY_LIST_DISTRICT,
  data,
  response: {
    success: QUERY_LIST_DISTRICT_SUCCESS,
    failed: QUERY_LIST_DISTRICT_FAILED,
  },
});

export const queryInfoAccount = (data?: any) => ({
  type: QUERY_INFO_ACCOUNT,
  data,
  response: {
    success: QUERY_INFO_ACCOUNT_SUCCESS,
    failed: QUERY_INFO_ACCOUNT_FAILED,
  },
});

export const queryResultFilter = (data?: any) => ({
  type: QUERY_RESULT_FILTER,
  data,
  response: {
    success: QUERY_RESULT_FILTER_SUCCESS,
    failed: QUERY_RESULT_FILTER_FAILED,
  },
});

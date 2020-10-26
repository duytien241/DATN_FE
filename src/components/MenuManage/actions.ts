import {
  MENU_QUERY_MENU_SHOP,
  MENU_CREATE_MENU_SHOP,
  MENU_UPDATE_MENU_SHOP,
  MENU_QUERY_FOOD_IN_MENU,
  MENU_INSERT_FOOD_MENU_SHOP,
  MENU_DELETE_FOOD_MENU_SHOP,
  MENU_DELETE_MENU_SHOP,
} from 'redux-saga/actions';
import { FORM_TYPE } from 'utils/common';
import {
  MENU_QUERY_MENU_SHOP_FAILED,
  MENU_QUERY_MENU_SHOP_SUCCESS,
  MENU_CREATE_MENU_SHOP_SUCCESS,
  MENU_CREATE_MENU_SHOP_FAILED,
  MENU_UPDATE_MENU_SHOP_SUCCESS,
  MENU_UPDATE_MENU_SHOP_FAILED,
  MENU_QUERY_FOOD_IN_MENU_SUCCESS,
  MENU_QUERY_FOOD_IN_MENU_FAILED,
  MENU_INSERT_FOOD_MENU_SHOP_SUCCESS,
  MENU_INSERT_FOOD_MENU_SHOP_FAILED,
  MENU_DELETE_FOOD_MENU_SHOP_SUCCESS,
  MENU_DELETE_FOOD_MENU_SHOP_FAILED,
  MENU_DELETE_MENU_SHOP_SUCCESS,
  MENU_DELETE_MENU_SHOP_FAILED,
} from './reducers';

export const queryMenuShop = (data: any) => ({
  type: MENU_QUERY_MENU_SHOP,
  data,
  action: 'MENU',
  response: {
    success: MENU_QUERY_MENU_SHOP_SUCCESS,
    failed: MENU_QUERY_MENU_SHOP_FAILED,
  },
});

export const createMenuShop = (data: any) => ({
  type: MENU_CREATE_MENU_SHOP,
  data,
  action: FORM_TYPE.CREATE,
  response: {
    success: MENU_CREATE_MENU_SHOP_SUCCESS,
    failed: MENU_CREATE_MENU_SHOP_FAILED,
  },
});

export const updateMenuShop = (data: any) => ({
  type: MENU_UPDATE_MENU_SHOP,
  data,
  action: FORM_TYPE.UPDATE,
  response: {
    success: MENU_UPDATE_MENU_SHOP_SUCCESS,
    failed: MENU_UPDATE_MENU_SHOP_FAILED,
  },
});

export const deleteMenuShop = (data: any) => ({
  type: MENU_DELETE_MENU_SHOP,
  data,
  response: {
    success: MENU_DELETE_MENU_SHOP_SUCCESS,
    failed: MENU_DELETE_MENU_SHOP_FAILED,
  },
});

export const queryFoodInMenu = (data: any) => ({
  type: MENU_QUERY_FOOD_IN_MENU,
  data,
  action: 'MENU_DETAIL',
  response: {
    success: MENU_QUERY_FOOD_IN_MENU_SUCCESS,
    failed: MENU_QUERY_FOOD_IN_MENU_FAILED,
  },
});

export const insertFoodMenuShop = (data: any) => ({
  type: MENU_INSERT_FOOD_MENU_SHOP,
  data,
  action: FORM_TYPE.INSERT,
  response: {
    success: MENU_INSERT_FOOD_MENU_SHOP_SUCCESS,
    failed: MENU_INSERT_FOOD_MENU_SHOP_FAILED,
  },
});

export const deleteFoodMenuShop = (data: any) => ({
  type: MENU_DELETE_FOOD_MENU_SHOP,
  data,
  action: FORM_TYPE.DELETE,
  response: {
    success: MENU_DELETE_FOOD_MENU_SHOP_SUCCESS,
    failed: MENU_DELETE_FOOD_MENU_SHOP_FAILED,
  },
});

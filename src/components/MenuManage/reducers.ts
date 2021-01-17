import { Action, Obj } from 'interfaces/common';

export const MENU_QUERY_MENU_SHOP_SUCCESS = 'MENU_QUERY_MENU_SHOP_SUCCESS';
export const MENU_QUERY_MENU_SHOP_FAILED = 'MENU_QUERY_MENU_SHOP_FAILED';
export const MENU_QUERY_MENU_SHOP_USER_SUCCESS = 'MENU_QUERY_MENU_SHOP_USER_SUCCESS';
export const MENU_QUERY_MENU_SHOP_USER_FAILED = 'MENU_QUERY_MENU_SHOP_USER_FAILED';

export function MenuList(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case MENU_QUERY_MENU_SHOP_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}
export function MenuListShop(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case MENU_QUERY_MENU_SHOP_USER_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}

export const MENU_CREATE_MENU_SHOP_SUCCESS = 'MENU_CREATE_MENU_SHOP_SUCCESS';
export const MENU_CREATE_MENU_SHOP_FAILED = 'MENU_CREATE_MENU_SHOP_FAILED';

export function CreateMenuResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case MENU_CREATE_MENU_SHOP_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}

export const MENU_UPDATE_MENU_SHOP_SUCCESS = 'MENU_UPDATE_MENU_SHOP_SUCCESS';
export const MENU_UPDATE_MENU_SHOP_FAILED = 'MENU_UPDATE_MENU_SHOP_FAILED';

export function UpdateMenuResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case MENU_UPDATE_MENU_SHOP_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}

export const MENU_DELETE_MENU_SHOP_SUCCESS = 'MENU_DELETE_MENU_SHOP_SUCCESS';
export const MENU_DELETE_MENU_SHOP_FAILED = 'MENU_DELETE_MENU_SHOP_FAILED';

export function DeleteMenuResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case MENU_DELETE_MENU_SHOP_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}

export const MENU_QUERY_FOOD_IN_MENU_SUCCESS = 'MENU_QUERY_FOOD_IN_MENU_SUCCESS';
export const MENU_QUERY_FOOD_IN_MENU_FAILED = 'MENU_QUERY_FOOD_IN_MENU_FAILED';

export function FoodInMenu(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case MENU_QUERY_FOOD_IN_MENU_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}

export const MENU_INSERT_FOOD_MENU_SHOP_SUCCESS = 'MENU_INSERT_FOOD_MENU_SHOP_SUCCESS';
export const MENU_INSERT_FOOD_MENU_SHOP_FAILED = 'MENU_INSERT_FOOD_MENU_SHOP_FAILED';

export function InsertFoodMenuResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case MENU_INSERT_FOOD_MENU_SHOP_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}

export const MENU_DELETE_FOOD_MENU_SHOP_SUCCESS = 'MENU_DELETE_FOOD_MENU_SHOP_SUCCESS';
export const MENU_DELETE_FOOD_MENU_SHOP_FAILED = 'MENU_DELETE_FOOD_MENU_SHOP_FAILED';

export function DeleteFoodMenuResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case MENU_DELETE_FOOD_MENU_SHOP_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}

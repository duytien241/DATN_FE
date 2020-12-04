import { Action, Obj } from 'interfaces/common';

export const QUERY_RESTAURANT_NAME_SUCCESS = 'QUERY_RESTAURANT_NAME_SUCCESS';
export const QUERY_RESTAURANT_NAME_FAILED = 'QUERY_RESTAURANT_NAME_FAILED';

export const QUERY_FOOD_NAME_SEARCH_SUCCESS = 'QUERY_FOOD_NAME_SEARCH_SUCCESS';
export const QUERY_FOOD_NAME_SEARCH_FAILED = 'QUERY_FOOD_NAME_SEARCH_FAILED';

export function FoodListSearch(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case QUERY_FOOD_NAME_SEARCH_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

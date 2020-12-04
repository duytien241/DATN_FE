import { Action, Obj } from 'interfaces/common';

export const FOOD_CHANGE_FOOD_STATUS_SUCCESS = 'FOOD_CHANGE_FOOD_STATUS_SUCCESS';
export const FOOD_CHANGE_FOOD_STATUS_FAILED = 'FOOD_CHANGE_FOOD_STATUS_FAILED';

export function ChangeFoodStatusResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case FOOD_CHANGE_FOOD_STATUS_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

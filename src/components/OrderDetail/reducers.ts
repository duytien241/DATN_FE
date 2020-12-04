import { Action, Obj } from 'interfaces/common';

export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';

export function OrderResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case PLACE_ORDER_SUCCESS:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
}

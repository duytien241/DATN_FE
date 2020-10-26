import { Action, Obj } from 'interfaces/common';

export const ADMIN_QUERY_SHOP_PENDING_LIST_SUCCESS = 'ADMIN_QUERY_SHOP_PENDING_LIST_SUCCESS';
export const ADMIN_QUERY_SHOP_PENDING_LIST_FAILED = 'ADMIN_QUERY_SHOP_PENDING_LIST_FAILED';

export function ShopPendingList(state: Obj | null = null, action: Action<null>) {
  switch (action.type) {
    case ADMIN_QUERY_SHOP_PENDING_LIST_SUCCESS:
      return action.payload;
    case ADMIN_QUERY_SHOP_PENDING_LIST_FAILED:
      return null;
    default:
      return state;
  }
}

export const ADMIN_DECISION_SHOP_REGISTER_SUCCESS = 'ADMIN_DECISION_SHOP_REGISTER_SUCCESS';
export const ADMIN_DECISION_SHOP_REGISTER_FAILED = 'ADMIN_DECISION_SHOP_REGISTER_FAILED';

export function DecisionShopResult(state: Obj | null = null, action: Action<null>) {
  switch (action.type) {
    case ADMIN_DECISION_SHOP_REGISTER_SUCCESS:
      return action.payload;
    case ADMIN_DECISION_SHOP_REGISTER_FAILED:
      return null;
    default:
      return state;
  }
}

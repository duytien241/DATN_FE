import { Action, Obj } from 'interfaces/common';

export const STATISTICAL_QUERY_ORDER_SHOP_SUCCESS = 'STATISTICAL_QUERY_ORDER_SHOP_SUCCESS';
export const STATISTICAL_QUERY_ORDER_SHOP_FAILED = 'STATISTICAL_QUERY_ORDER_SHOP_FAILED';

export function StatisticalOrderList(state: Obj | null = null, action: Action<null>) {
  switch (action.type) {
    case STATISTICAL_QUERY_ORDER_SHOP_SUCCESS:
      return action.payload;
    case STATISTICAL_QUERY_ORDER_SHOP_FAILED:
      return null;
    default:
      return state;
  }
}

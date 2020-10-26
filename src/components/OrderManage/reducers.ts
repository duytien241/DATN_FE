import { Action, Obj } from 'interfaces/common';

export const ORDER_QUERY_ORDER_SUCCESS = 'ORDER_QUERY_ORDER_SUCCESS';
export const ORDER_QUERY_ORDER_FAILED = 'ORDER_QUERY_ORDER_FAILED';

export const ORDER_UPDATE_ORDER_SUCCESS = 'ORDER_UPDATE_ORDER_SUCCESS';
export const ORDER_UPDATE_ORDER_FAILED = 'ORDER_UPDATE_ORDER_FAILED';

export const ORDER_QUERY_ORDER_STATUS_SUCCESS = 'ORDER_QUERY_ORDER_STATUS_SUCCESS';
export const ORDER_QUERY_ORDER_STATUS_FAILED = 'ORDER_QUERY_ORDER_STATUS_FAILED';

export function OrderList(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case ORDER_QUERY_ORDER_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}

export function UpdateOrderResult(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case ORDER_UPDATE_ORDER_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}

export function OrderStatusList(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case ORDER_QUERY_ORDER_STATUS_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}

export const ORDER_QUERY_ORDER_DETAIL_SUCCESS = 'ORDER_QUERY_ORDER_DETAIL_SUCCESS';
export const ORDER_QUERY_ORDER_DETAIL_FAILED = 'ORDER_QUERY_ORDER_DETAIL_FAILED';

export function OrderDetailShop(state: Obj | null = null, action: Action<Obj>) {
  switch (action.type) {
    case ORDER_QUERY_ORDER_DETAIL_SUCCESS:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}

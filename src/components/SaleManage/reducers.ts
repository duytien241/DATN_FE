import { Action, Obj } from 'interfaces/common';

export const SALE_CREATE_SALE_CODE_SUCCESS = 'SALE_CREATE_SALE_CODE_SUCCESS';
export const SALE_CREATE_SALE_CODE_FAILED = 'SALE_CREATE_SALE_CODE_FAILED';

export function CreateSaleResult(state: Obj | null = null, action: Action<null>) {
  switch (action.type) {
    case SALE_CREATE_SALE_CODE_SUCCESS:
      return action.payload;
    case SALE_CREATE_SALE_CODE_FAILED:
      return null;
    default:
      return state;
  }
}

export const SALE_QUERY_SALE_CODE_LIST_SUCCESS = 'SALE_QUERY_SALE_CODE_LIST_SUCCESS';
export const SALE_QUERY_SALE_CODE_LIST_FAILED = 'SALE_QUERY_SALE_CODE_LIST_FAILED';

export function SaleCodeList(state: Obj | null = null, action: Action<null>) {
  switch (action.type) {
    case SALE_QUERY_SALE_CODE_LIST_SUCCESS:
      return action.payload;
    case SALE_QUERY_SALE_CODE_LIST_FAILED:
      return null;
    default:
      return state;
  }
}

export const SALE_QUERY_SALE_TYPE_SUCCESS = 'SALE_QUERY_SALE_TYPE_SUCCESS';
export const SALE_QUERY_SALE_TYPE_FAILED = 'SALE_QUERY_SALE_TYPE_FAILED';

export function SaleTypeList(state: Obj | null = null, action: Action<null>) {
  switch (action.type) {
    case SALE_QUERY_SALE_TYPE_SUCCESS:
      return action.payload;
    case SALE_QUERY_SALE_TYPE_FAILED:
      return null;
    default:
      return state;
  }
}

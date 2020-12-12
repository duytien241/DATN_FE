import { Action, Obj } from 'interfaces/common';
import { Selector } from 'react-redux';
import { State } from 'redux-saga/reducers';
import { createSelector } from 'reselect';

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

export const saleCodeList = (state: State) => state.saleCodeList;

export const getSaleCodeList: Selector<State, Obj[]> = createSelector([saleCodeList], (saleCodeList: any) => {
  if (saleCodeList && saleCodeList.data) {
    return saleCodeList.data.map((data: any) => {
      return {
        value:
          data.type === 'FreeShip'
            ? 15000
            : data.type === 'Sale 50%'
            ? 0.5
            : data.type === 'Sale 5%'
            ? 0.05
            : data.code,
        text: data.type,
        type: data.type,
        code: data.code,
      };
    });
  }
  return [];
});

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

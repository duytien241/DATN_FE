import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import {
  FOOD_QUERY_FOOD_DETAIL,
  FOOD_QUERY_FOOD_LIST,
  FOOD_QUERY_FOOD_LIST_CATEGORY,
  FOOD_QUERY_FOOD_TYPE,
  QUERY_FOOD_NAME_SEARCH,
} from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios } from 'utils/common';

const queryFoodList = async (param?: Obj) => {
  return await Axios.get(`${BASE_URI}api/menu/${param?.id}`, {
    params: param,
    headers: configHeaderAxios,
  });
};

const queryFoodType = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/v1/food/type`, {
    params: param,
    headers: configHeaderAxios,
  });
};

function* doQueryFoodList(request: Request<Obj>) {
  try {
    let payload = null;
    if (request.type === FOOD_QUERY_FOOD_LIST) {
      payload = yield queryFoodList(request.data);
    } else if (request.type === FOOD_QUERY_FOOD_DETAIL) {
      payload = yield queryFoodList(request.data);
    } else if (request.type === FOOD_QUERY_FOOD_TYPE) {
      payload = yield queryFoodType(request.data);
    } else if (request.type === FOOD_QUERY_FOOD_LIST_CATEGORY) {
      payload = yield queryFoodList(request.data);
    } else if (request.type === QUERY_FOOD_NAME_SEARCH) {
      payload = yield queryFoodList(request.data);
    }
    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryFoodList() {
  yield takeLatest(FOOD_QUERY_FOOD_LIST, doQueryFoodList);
}

export function* watchQueryFoodDetail() {
  yield takeLatest(FOOD_QUERY_FOOD_DETAIL, doQueryFoodList);
}

export function* watchQueryFoodType() {
  yield takeLatest(FOOD_QUERY_FOOD_TYPE, doQueryFoodList);
}

export function* watchQueryFoodListByCategory() {
  yield takeLatest(FOOD_QUERY_FOOD_LIST_CATEGORY, doQueryFoodList);
}

export function* watchQueryFoodListSearch() {
  yield takeLatest(QUERY_FOOD_NAME_SEARCH, doQueryFoodList);
}

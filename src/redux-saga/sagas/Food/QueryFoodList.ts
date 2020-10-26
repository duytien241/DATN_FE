import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { FOOD_QUERY_FOOD_LIST, FOOD_QUERY_FOOD_TYPE } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios } from 'utils/common';

const queryFoodList = async (param: Obj) => {
  console.log(param);

  return await Axios.get(`${BASE_URI}api/v1/food`, {
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
    } else if (request.type === FOOD_QUERY_FOOD_TYPE) {
      payload = yield queryFoodType(request.data);
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

export function* watchQueryFoodType() {
  yield takeLatest(FOOD_QUERY_FOOD_TYPE, doQueryFoodList);
}

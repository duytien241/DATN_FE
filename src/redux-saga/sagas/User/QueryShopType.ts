import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { GLOBAL_QUERY_SHOP_LIST, USER_QUERY_SHOP_INFO, USER_QUERY_SHOP_TYPE } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios } from 'utils/common';

const queryShopType = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/v1/user/type`, configHeaderAxios);
};

const queryShopInfo = async (param: Obj) => {
  console.log(param);
  return await Axios.get(`${BASE_URI}api/v1/user/info`, { params: param, headers: configHeaderAxios });
};

const queryShopList = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/v1/user/list`, { params: param, headers: configHeaderAxios });
};

function* doQueryShop(request: Request<Obj>) {
  try {
    let payload = null;
    if (request.type === USER_QUERY_SHOP_TYPE) {
      payload = yield queryShopType(request.data);
    } else if (request.type === USER_QUERY_SHOP_INFO) {
      payload = yield queryShopInfo(request.data);
    } else if (request.type === GLOBAL_QUERY_SHOP_LIST) {
      payload = yield queryShopList(request.data);
    }
    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryShopType() {
  yield takeLatest(USER_QUERY_SHOP_TYPE, doQueryShop);
}

export function* watchQueryShopInfo() {
  yield takeLatest(USER_QUERY_SHOP_INFO, doQueryShop);
}

export function* watchQueryShopList() {
  yield takeLatest(GLOBAL_QUERY_SHOP_LIST, doQueryShop);
}

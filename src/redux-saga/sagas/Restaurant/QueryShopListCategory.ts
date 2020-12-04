import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { SHOP_QUERY_SHOP_LIST_CATEGORY } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios } from 'utils/common';

const queryShopListCategory = async (param?: Obj) => {
  return await Axios.get(`${BASE_URI}api/foodtype/${param?.id}`, {
    params: param,
    headers: configHeaderAxios,
  });
};

function* doQueryShopListCategory(request: Request<Obj>) {
  try {
    let payload = yield queryShopListCategory(request.data);
    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryShopListCategory() {
  yield takeLatest(SHOP_QUERY_SHOP_LIST_CATEGORY, doQueryShopListCategory);
}

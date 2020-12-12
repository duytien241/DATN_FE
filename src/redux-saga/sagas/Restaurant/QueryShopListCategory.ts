import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { SHOP_QUERY_SHOP_LIST_CATEGORY } from 'redux-saga/actions';
import { BASE_URI } from 'utils/common';

const queryShopListCategory = async (param?: Obj) => {
  return Axios.get(`${BASE_URI}api/foodtype/${param?.id}/?page=${param?.page}`)
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

function* doQueryShopListCategory(request: Request<Obj>) {
  try {
    let payload = yield queryShopListCategory(request.data);
    console.log(payload, 'sssss');

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

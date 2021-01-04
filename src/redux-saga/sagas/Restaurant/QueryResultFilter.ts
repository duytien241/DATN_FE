import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { QUERY_RESULT_FILTER } from 'redux-saga/actions';
import { BASE_URI } from 'utils/common';

const queryShopList = async (param?: Obj) => {
  return Axios.get(`${BASE_URI}api/filter?page=${param?.page ? param?.page : 1}`, {
    params: param,
  })
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

function* doQueryShopList(request: Request<Obj>) {
  try {
    let payload = yield queryShopList(request.data);

    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryResultFilter() {
  yield takeLatest(QUERY_RESULT_FILTER, doQueryShopList);
}

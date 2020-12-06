import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { QUERY_LIST_CATEGORY } from 'redux-saga/actions';
import { BASE_URI } from 'utils/common';

const queryListCategory = (param?: Obj) => {
  return axios
    .get(`${BASE_URI}api/foodtype/`)
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

function* doQueryListCategory(request: Request<Obj>) {
  try {
    let payload = yield queryListCategory(request.data);
    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryListCategory() {
  yield takeLatest(QUERY_LIST_CATEGORY, doQueryListCategory);
}

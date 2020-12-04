import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { QUERY_LIST_CATEGORY } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios } from 'utils/common';

const queryListCategory = async (param?: Obj) => {
  return await Axios.get(`${BASE_URI}api/foodtype/`, {
    params: param,
    headers: configHeaderAxios,
  });
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

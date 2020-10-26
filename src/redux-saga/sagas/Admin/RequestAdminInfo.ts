import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { ADMIN_QUERY_ADMIN_INFO } from 'redux-saga/actions';
import { BASE_URI } from 'utils/common';

const queryAdminInfo = async (param: any) => {
  return await Axios.get(`${BASE_URI}api/v1/admin`, {
    params: param,
  });
};

function* doRequestAdminInfo(request: Request<Obj>) {
  try {
    let payload = null;
    if (request.type === ADMIN_QUERY_ADMIN_INFO) {
      payload = yield queryAdminInfo(request.data);
    }
    yield put({
      type: (request.response as any).success,
      payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryAdminInfo() {
  yield takeLatest(ADMIN_QUERY_ADMIN_INFO, doRequestAdminInfo);
}

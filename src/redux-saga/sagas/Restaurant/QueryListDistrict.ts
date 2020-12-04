import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { QUERY_LIST_DISTRICT } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios } from 'utils/common';

const queryListDistrict = async (param?: Obj) => {
  return await Axios.get(`${BASE_URI}api/district`, {
    params: param,
    headers: configHeaderAxios,
  });
};

function* doQueryListDistrict(request: Request<Obj>) {
  try {
    let payload = yield queryListDistrict(request.data);
    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryListDistrict() {
  yield takeLatest(QUERY_LIST_DISTRICT, doQueryListDistrict);
}

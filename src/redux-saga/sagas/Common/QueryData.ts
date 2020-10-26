import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { GLOBAL_QUERY_LOCATION } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios } from 'utils/common';

const queryLocaltion = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/v1/location`, {
    params: param,
    headers: configHeaderAxios,
  });
};

function* doQueryLocation(request: Request<Obj>) {
  try {
    const payload = yield queryLocaltion(request.data);

    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryLocation() {
  yield takeLatest(GLOBAL_QUERY_LOCATION, doQueryLocation);
}

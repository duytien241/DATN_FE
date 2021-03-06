import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { QUERY_HISTORY } from 'redux-saga/actions';
import { BASE_URI } from 'utils/common';
import Cookies from 'js-cookie';

const queryHistory = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/orders`, { headers: { Authorization: `Token  ${Cookies.get('userInfo')}` } })
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

function* doQueryHistory(request: Request<Obj>) {
  try {
    let payload = null;
    payload = yield queryHistory(request.data);

    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryHistory() {
  yield takeLatest(QUERY_HISTORY, doQueryHistory);
}

import { REQUEST_RATING, QUERY_RATING } from 'redux-saga/actions';
import qs from 'querystring';
import Axios from 'axios';
import { Obj, Request } from 'interfaces/common';
import { put, takeLatest } from 'redux-saga/effects';
import { BASE_URI, configHeaderAxios, notificationSuccess } from 'utils/common';

const requestRating = async (param: any) => {
  console.log(param);

  return await Axios.post(`${BASE_URI}api/v1/cus/rating`, qs.stringify(param), configHeaderAxios);
};

const queryRating = async (param: any) => {
  return await Axios.get(`${BASE_URI}api/v1/user/rating`, {
    params: param,
  });
};

function* doRating(request: Request<Obj>) {
  let payload = null;
  if (request.type === REQUEST_RATING) {
    payload = yield requestRating(request.data);
    notificationSuccess({ content: 'Đánh giá cửa hàng thành công' });
  } else if (request.type === QUERY_RATING) {
    payload = yield queryRating(request.data);
  }

  yield put({
    type: (request.response as any).success,
    payload,
  });
}

export function* watchRequestRating() {
  yield takeLatest(REQUEST_RATING, doRating);
}

export function* watchQueryRating() {
  yield takeLatest(QUERY_RATING, doRating);
}

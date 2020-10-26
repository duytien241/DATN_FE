import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { USER_QUERY_RATING_LIST } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios } from 'utils/common';

const queryRatingList = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/v1/user/rating`, {
    params: param,
    headers: configHeaderAxios.headers,
  });
};

function* doQueryRatingList(request: Request<Obj>) {
  try {
    let payload = null;
    if (request.type === USER_QUERY_RATING_LIST) {
      payload = yield queryRatingList(request.data);
    }
    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryRatingList() {
  yield takeLatest(USER_QUERY_RATING_LIST, doQueryRatingList);
}

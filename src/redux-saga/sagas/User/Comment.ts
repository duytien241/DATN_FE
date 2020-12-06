import { QUERY_COMMENT, REQUEST_COMMENT } from 'redux-saga/actions';
import Axios from 'axios';
import { Obj, Request } from 'interfaces/common';
import { put, takeLatest } from 'redux-saga/effects';
import { BASE_URI } from 'utils/common';

const requestComment = (param: any) => {
  return Axios.get(`${BASE_URI}api/v1/food/comment/`)
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

const queryComment = (param: any) => {
  return Axios.get(`${BASE_URI}api/comment/${param.id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

function* doComment(request: Request<Obj>) {
  let payload = null;
  if (request.type === REQUEST_COMMENT) {
    payload = yield requestComment(request.data);
  } else if (request.type === QUERY_COMMENT) {
    payload = yield queryComment(request.data);
  }

  yield put({
    type: (request.response as any).success,
    payload,
  });
}

export function* watchRequestComment() {
  yield takeLatest(REQUEST_COMMENT, doComment);
}

export function* watchQueryComment() {
  yield takeLatest(QUERY_COMMENT, doComment);
}

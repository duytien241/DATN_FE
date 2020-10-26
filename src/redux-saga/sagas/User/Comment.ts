import { COMMENT } from 'redux-saga/actions';
import { Obj, Request } from 'interfaces/common';
import { put, takeLatest } from 'redux-saga/effects';
import { COMMENT_SUCCESS } from 'components/reducers';

function* doComment(request: Request<Obj>) {
  yield put({ type: COMMENT_SUCCESS, payload: request.data });
}

export default function* watchComment() {
  yield takeLatest(COMMENT, doComment);
}

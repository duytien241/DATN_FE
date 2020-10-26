import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { AUTHENTICATION_LOG_OUT } from 'redux-saga/actions';
import { notificationSuccess } from 'utils/common';
import Cookie from 'js-cookie';
import { ROUTER_REFRESH } from 'components/Router/reducers';

function* doLogOut(request: Request<Obj>) {
  try {
    yield put({
      type: (request.response as any).success,
    });
    Cookie.remove('userInfo');
    yield put({
      type: ROUTER_REFRESH,
    });
    notificationSuccess({ content: 'Log out' });
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchRegister() {
  yield takeLatest(AUTHENTICATION_LOG_OUT, doLogOut);
}

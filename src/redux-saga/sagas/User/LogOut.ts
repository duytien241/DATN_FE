import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import Axios from 'axios';
import { BASE_URI } from 'utils/common';
import { AUTHENTICATION_LOG_OUT } from 'redux-saga/actions';
import { notificationSuccess } from 'utils/common';
import Cookie from 'js-cookie';

const logout = () => {
  return Axios.post(`${BASE_URI}rest-auth/logout/`, { headers: { Authorization: `Token  ${Cookie.get('userInfo')}` } });
};

function* doLogOut(request: Request<Obj>) {
  try {
    yield logout();
    yield put({
      type: (request.response as any).success,
    });
    Cookie.remove('userInfo');
    window.location = '/' as any;
    notificationSuccess({ content: 'Bạn đã đăng xuất' });
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchRegister() {
  yield takeLatest(AUTHENTICATION_LOG_OUT, doLogOut);
}

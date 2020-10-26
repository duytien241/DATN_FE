import Axios from 'axios';
import qs from 'qs';
import Cookie from 'js-cookie';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { AUTHENTICATION_LOGIN } from 'redux-saga/actions';
import { configHeaderAxios, notificationError, notificationSuccess } from 'utils/common';
import { BASE_URI } from 'utils/common';

const login = async (param: any) => {
  return Axios.post(`${BASE_URI}api/v1/login`, qs.stringify(param), configHeaderAxios);
};

function* doLogin(request: Request<Obj>) {
  try {
    const payload = yield login(request.data);
    Cookie.set('userInfo', JSON.stringify(payload), { expires: 7 });

    yield put({
      type: (request.response as any).success,
      payload,
    });
    notificationSuccess({ content: 'Đăng nhập thành công' });
  } catch (error) {
    notificationError({ content: 'Đăng nhập Thất bại' });
    console.log(error.message);
  }
}

export default function* watchLogin() {
  yield takeLatest(AUTHENTICATION_LOGIN, doLogin);
}

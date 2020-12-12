import Axios from 'axios';
import qs from 'qs';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { AUTHENTICATION_LOGIN, AUTHENTICATION_LOGIN_ADMIN, QUERY_INFO_ACCOUNT } from 'redux-saga/actions';
import { configHeaderAxios, notificationError, notificationSuccess } from 'utils/common';
import { BASE_URI } from 'utils/common';
import Cookies from 'js-cookie';

export const login = (param: any) => {
  return Axios.post(`${BASE_URI}rest-auth/login/`, {
    username: param.username,
    password: param.password,
  })
    .then((res) => {
      Cookies.set('userInfo', res.data.key, { expires: 7 });
      return res.data;
    })
    .catch((error) => console.log(error));
};

const loginAdmin = (param: any) => {
  return Axios.post(`${BASE_URI}api/v1/admin/login`, qs.stringify(param), configHeaderAxios);
};

const getInfoAccount = (param: any) => {
  return Axios.get(`${BASE_URI}me`, { headers: { Authorization: `Token  ${Cookies.get('userInfo')}` } })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};

function* doLogin(request: Request<Obj>) {
  try {
    let payload = null;
    if (request.type === AUTHENTICATION_LOGIN) {
      payload = yield login(request.data);
    } else if (request.type === AUTHENTICATION_LOGIN_ADMIN) {
      payload = yield loginAdmin(request.data);
    }
    window.location = '/' as any;
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

function* dogetInfo(request: Request<Obj>) {
  try {
    let payload = yield getInfoAccount(request.data);
    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchGetInfo() {
  yield takeLatest(QUERY_INFO_ACCOUNT, dogetInfo);
}

export function* watchLogin() {
  yield takeLatest(AUTHENTICATION_LOGIN, doLogin);
}

export function* watchLoginAdmin() {
  yield takeLatest(AUTHENTICATION_LOGIN_ADMIN, doLogin);
}

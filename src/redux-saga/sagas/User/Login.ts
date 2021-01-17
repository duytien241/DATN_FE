import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import {
  AUTHENTICATION_LOGIN,
  AUTHENTICATION_LOGIN_ADMIN,
  AUTHENTICATION_LOGIN_FORM,
  CHATBOT_ADD_NEW_USER_MESSAGE,
  QUERY_INFO_ACCOUNT,
} from 'redux-saga/actions';
import { notificationError, notificationSuccess, setKey } from 'utils/common';
import { BASE_URI } from 'utils/common';
import Cookies from 'js-cookie';
import store from 'redux-saga/store';
import { MESSAGE_SENDER, MESSAGE_TYPE } from 'components/Chatbot/reducers';

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

const getInfoAccount = (param: any) => {
  return Axios.get(`${BASE_URI}me`, { headers: { Authorization: `Token  ${Cookies.get('userInfo')}` } })
    .then((res) => {
      console.log(res);
      setKey('userId', (res.data as Obj).id);
      return res.data;
    })
    .catch((error) => console.log(error));
};

function* doLogin(request: Request<Obj>) {
  try {
    let payload = null;
    if (request.type === AUTHENTICATION_LOGIN || request.type === AUTHENTICATION_LOGIN_FORM) {
      payload = yield login(request.data);
    } else if (request.type === AUTHENTICATION_LOGIN_ADMIN) {
      payload = yield loginAdmin(request.data);
    }
    console.log(payload);

    if (payload) {
      if (request.type !== AUTHENTICATION_LOGIN_FORM) {
        window.location = '/' as any;
      }
      yield put({
        type: (request.response as any).success,
        payload,
      });
      notificationSuccess({ content: 'Đăng nhập thành công' });
      if (request.type === AUTHENTICATION_LOGIN_FORM) {
        Axios.get(`${BASE_URI}me`, { headers: { Authorization: `Token  ${payload.key}` } })
          .then((res) => {
            setKey('userId', (res.data as Obj).id);
            store.dispatch({
              type: CHATBOT_ADD_NEW_USER_MESSAGE,
              payload: {
                sender: MESSAGE_SENDER.CLIENT,
                text: `Tài khoản ${(res.data as Obj).id}`,
                showAvatar: false,
                timestamp: new Date(),
                type: MESSAGE_TYPE.COMPONENT,
              },
            });
          })
          .catch((error) => console.log(error));
      }
    } else {
      notificationError({ content: 'Đăng nhập Thất bại' });
    }
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

export function* watchLoginForm() {
  yield takeLatest(AUTHENTICATION_LOGIN_FORM, doLogin);
}

export function* watchLoginAdmin() {
  yield takeLatest(AUTHENTICATION_LOGIN_ADMIN, doLogin);
}

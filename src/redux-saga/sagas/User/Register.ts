import Axios from 'axios';
import qs from 'querystring';
import Cookie from 'js-cookie';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { AUTHENTICATION_REGISTER, USER_UPDATE_INFO_USER, AUTHENTICATION_CHANGE_PASSWORD } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios, notificationError, notificationSuccess } from 'utils/common';
import { login } from './Login';

const register = (param: any) => {
  console.log(param);
  if (param.role === 2) {
    return Axios.post(`${BASE_URI}users`, {
      id: param.email,
      email: param.email,
      password: param.password,
      username: param.username,
      role: param.role,
      address: param.address,
      phone: param.phone,
    })
      .then((res) => {
        login({
          username: param.email,
          password: param.password,
        });
        return res;
      })
      .catch((error) => console.log(error));
  } else {
    return Axios.post(`${BASE_URI}users`, {
      id: param.email,
      email: param.email,
      password: param.password,
      username: param.username,
      role: param.role,
      address: param.address,
      phone: param.hone,
      nameR: param.nameR,
      idNo: param.idNo,
      type: param.type,
    })
      .then((res) => {
        login({
          username: param.email,
          password: param.password,
        });
        return res;
      })
      .catch((error) => console.log(error));
  }
};

const updateInfoUser = async (param: any) => {
  return await Axios.put(`${BASE_URI}api/v1/user/update`, qs.stringify(param), configHeaderAxios);
};

const changePassord = async (param: any) => {
  return Axios.post(
    `${BASE_URI}rest-auth/password/change/`,
    {
      old_password: param.oldPass,
      new_password1: param.newPass,
      new_password2: param.newPass,
    },
    { headers: { Authorization: `Token  ${Cookie.get('userInfo')}` } }
  )
    .then((res) => {
      notificationSuccess({ content: 'Đổi mật khẩu thành công' });
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

const uploadFile = (input: FileList, id: number) => {
  if (input != null) {
    const file: File = input[0];
    const form = new FormData();
    form.append('type', 'file');
    form.append('image', file);
    form.append('id_user', `${id}`);

    return Axios.post(`${BASE_URI}api/v1/image/upload`, form, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
  } else {
    return null;
  }
};
function* doRegister(request: Request<Obj>) {
  try {
    let payload = null;
    let res = null;
    if (request.type === AUTHENTICATION_REGISTER) {
      payload = yield register(request.data);
    } else if (request.type === USER_UPDATE_INFO_USER) {
      if (request.data.image != null) {
        res = yield uploadFile(request.data.image, request.data.id);
      }
      request.data.image = res.data.id;
      payload = yield updateInfoUser(request.data);
    } else if (request.type === AUTHENTICATION_CHANGE_PASSWORD) {
      payload = yield changePassord(request.data);
    }
    yield put({
      type: (request.response as any).success,
      payload,
    });
    notificationSuccess({
      content: `${
        request.type === AUTHENTICATION_REGISTER
          ? 'Đăng ký thành công'
          : request.type === USER_UPDATE_INFO_USER
          ? 'Cập nhật thành công'
          : ''
      }`,
    });
  } catch (error) {
    console.log(error.message);
    notificationError({ content: error.message });
  }
}

export function* watchRegister() {
  yield takeLatest(AUTHENTICATION_REGISTER, doRegister);
}

export function* watchUpdateInfoUser() {
  yield takeLatest(USER_UPDATE_INFO_USER, doRegister);
}

export function* watchChangePassword() {
  yield takeLatest(AUTHENTICATION_CHANGE_PASSWORD, doRegister);
}

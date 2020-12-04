import Axios from 'axios';
import qs from 'querystring';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { AUTHENTICATION_REGISTER, USER_UPDATE_INFO_USER, AUTHENTICATION_CHANGE_PASSWORD } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios, notificationError, notificationSuccess } from 'utils/common';

const register = async (param: any) => {
  console.log(param);
  return await Axios.post(`${BASE_URI}api/user/register`, qs.stringify(param), configHeaderAxios);
};

const updateInfoUser = async (param: any) => {
  return await Axios.put(`${BASE_URI}api/v1/user/update`, qs.stringify(param), configHeaderAxios);
};

const changePassord = async (param: any) => {
  return await Axios.put(`${BASE_URI}api/v1/changePass`, qs.stringify(param), configHeaderAxios);
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

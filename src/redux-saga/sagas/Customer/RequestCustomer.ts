import Axios from 'axios';
import qs from 'querystring';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { USER_QUERY_CUS_INFO, USER_UPDATE_INFO_CUS } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios, notificationError, notificationSuccess } from 'utils/common';

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

const queryCusInfo = async (param: any) => {
  return await Axios.get(`${BASE_URI}api/v1/cus`, {
    params: param,
  });
};

const updateCusInfo = async (param: any) => {
  return await Axios.put(`${BASE_URI}api/v1/user/update`, qs.stringify(param), configHeaderAxios);
};

function* doActionCus(request: Request<Obj>) {
  try {
    let payload = null;
    let res = null;
    if (request.type === USER_QUERY_CUS_INFO) {
      payload = yield queryCusInfo(request.data);
    } else if (request.type === USER_UPDATE_INFO_CUS) {
      if (request.data.image != null) {
        res = yield uploadFile(request.data.image, request.data.id);
      }
      request.data.image = res.data.id;
      payload = yield updateCusInfo(request.data);
      notificationSuccess({ content: 'Cập nhật thành công' });
    }
    yield put({
      type: (request.response as any).success,
      payload,
    });
  } catch (error) {
    console.log(error.message);
    if (request.type === USER_UPDATE_INFO_CUS) {
      notificationError({ content: error.message });
    }
  }
}

export function* watchQueryCusInfo() {
  yield takeLatest(USER_QUERY_CUS_INFO, doActionCus);
}

export function* watchUpdateCusInfo() {
  yield takeLatest(USER_UPDATE_INFO_CUS, doActionCus);
}

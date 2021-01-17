import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { ADMIN_DELETE_CUS, QUERY_CUS_LIST, USER_QUERY_CUS_INFO, USER_UPDATE_INFO_CUS } from 'redux-saga/actions';
import { BASE_URI, notificationError, notificationSuccess } from 'utils/common';
import Cookies from 'js-cookie';

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
  return Axios.get(`${BASE_URI}me`, { headers: { Authorization: `Token  ${Cookies.get('userInfo')}` } })
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

const queryCusList = async (param: any) => {
  return await Axios.get(`${BASE_URI}users`)
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

const queryDeleteCus = async (param: any) => {
  return await Axios.delete(`${BASE_URI}user/${param.id}/`, {
    headers: { Authorization: `Token  ${Cookies.get('userInfo')}` },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

const updateCusInfo = async (param: any) => {
  console.log(param);
  return await Axios.put(
    `${BASE_URI}user/${param.id}/`,
    {
      name: param.name,
      address: param.Address_P,
      phone: param.SDT,
      birthday: param.Birth,
      first_name: param.name,
    },
    {
      headers: { Authorization: `Token  ${Cookies.get('userInfo')}` },
    }
  )
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

function* doActionCus(request: Request<Obj>) {
  try {
    let payload = null;
    let res = null;
    if (request.type === USER_QUERY_CUS_INFO) {
      payload = yield queryCusInfo(request.data);
    } else if (request.type === USER_UPDATE_INFO_CUS) {
      if (request?.data.image != null) {
        res = yield uploadFile(request.data.image, request.data.id);
        request.data.image = res.data.id;
      }
      payload = yield updateCusInfo(request.data);
      notificationSuccess({ content: 'Cập nhật thành công' });
    } else if (request.type === QUERY_CUS_LIST) {
      payload = yield queryCusList(request.data);
    } else if (request.type === ADMIN_DELETE_CUS) {
      payload = yield queryDeleteCus(request.data);
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

export function* watchQueryCusList() {
  yield takeLatest(QUERY_CUS_LIST, doActionCus);
}

export function* watchDeleteCusList() {
  yield takeLatest(ADMIN_DELETE_CUS, doActionCus);
}

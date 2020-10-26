import Axios from 'axios';
import qs from 'querystring';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { SALE_CREATE_SALE_CODE } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios, notificationError, notificationSuccess } from 'utils/common';

const createSaleCode = async (param: any) => {
  return await Axios.post(`${BASE_URI}api/v1/sale/create`, qs.stringify(param), configHeaderAxios);
};

function* doCreateSaleCode(request: Request<Obj>) {
  try {
    const payload = yield createSaleCode(request.data);
    yield put({
      type: (request.response as any).success,
      payload,
    });
    notificationSuccess({ content: 'Cập nhật thành công' });
  } catch (error) {
    console.log(error.message);
    notificationError({ content: error.message });
  }
}

export default function* watchCreateSaleCode() {
  yield takeLatest(SALE_CREATE_SALE_CODE, doCreateSaleCode);
}

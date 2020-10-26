import Axios from 'axios';
import qs from 'querystring';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { ORDER_UPDATE_ORDER } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios, notificationError, notificationSuccess } from 'utils/common';

const updateOrder = async (param: any) => {
  return await Axios.put(`${BASE_URI}api/v1/order/update`, qs.stringify(param), configHeaderAxios);
};

function* doUpdateOrder(request: Request<Obj>) {
  try {
    const payload = yield updateOrder(request.data);

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

export default function* watchUpdateOrder() {
  yield takeLatest(ORDER_UPDATE_ORDER, doUpdateOrder);
}

import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { PLACE_ORDER } from 'redux-saga/actions';
import { BASE_URI, notificationError, notificationSuccess } from 'utils/common';

const placeOrder = async (param: any) => {
  return await Axios.post(`${BASE_URI}api/v1/place/order`, param, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

function* doPlaceOrder(request: Request<Obj>) {
  try {
    const payload = yield placeOrder(request.data);

    yield put({
      type: (request.response as any).success,
      payload,
    });
    notificationSuccess({ content: 'Đặt hàng thành công' });
  } catch (error) {
    console.log(error.message);
    notificationError({ content: error.message });
  }
}

export default function* watchPlaceOrder() {
  yield takeLatest(PLACE_ORDER, doPlaceOrder);
}

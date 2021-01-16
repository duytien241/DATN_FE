import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { ORDER_QUERY_ORDER, ORDER_QUERY_ORDER_DETAIL, ORDER_QUERY_ORDER_STATUS } from 'redux-saga/actions';
import { BASE_URI } from 'utils/common';
import Cookies from 'js-cookie';

const queryOrder = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/shop/orders`, {
    headers: { Authorization: `Token  ${Cookies.get('userInfo')}` },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

function* doQueryOrder(request: Request<Obj>) {
  try {
    let payload = null;
    if (request.type === ORDER_QUERY_ORDER) {
      payload = yield queryOrder(request.data);
      console.log(payload);
    }
    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryOrder() {
  yield takeLatest(ORDER_QUERY_ORDER, doQueryOrder);
}

export function* watchQueryOrderStatus() {
  yield takeLatest(ORDER_QUERY_ORDER_STATUS, doQueryOrder);
}

export function* watchQueryOrderDetailShop() {
  yield takeLatest(ORDER_QUERY_ORDER_DETAIL, doQueryOrder);
}

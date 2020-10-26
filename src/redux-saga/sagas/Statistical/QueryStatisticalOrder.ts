import Axios from 'axios';
// import qs from 'querystring';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { STATISTICAL_QUERY_ORDER_SHOP } from 'redux-saga/actions';
import { BASE_URI } from 'utils/common';

const queryStatisticalOrder = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/v1/order/statistical`, {
    params: param,
  });
};

function* doQueryStatisticalOrder(request: Request<Obj>) {
  try {
    const payload = yield queryStatisticalOrder(request.data);

    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchQueryStatisticalOrder() {
  yield takeLatest(STATISTICAL_QUERY_ORDER_SHOP, doQueryStatisticalOrder);
}

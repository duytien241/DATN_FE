import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { SALE_QUERY_SALE_TYPE } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios } from 'utils/common';

const querySaleType = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/v1/sale/type`, configHeaderAxios);
};

function* doQuerySaleType(request: Request<Obj>) {
  try {
    const payload = yield querySaleType(request.data);
    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchQuerySaleType() {
  yield takeLatest(SALE_QUERY_SALE_TYPE, doQuerySaleType);
}

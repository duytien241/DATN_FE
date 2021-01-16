import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { SALE_QUERY_SALE_CODE_LIST } from 'redux-saga/actions';
import { BASE_URI } from 'utils/common';
import Cookies from 'js-cookie';

const querySaleCode = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/sale`, { headers: { Authorization: `Token  ${Cookies.get('userInfo')}` } })
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

function* doQuerySaleCode(request: Request<Obj>) {
  try {
    const payload = yield querySaleCode(request.data);
    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export default function* watchQuerySaleCode() {
  yield takeLatest(SALE_QUERY_SALE_CODE_LIST, doQuerySaleCode);
}

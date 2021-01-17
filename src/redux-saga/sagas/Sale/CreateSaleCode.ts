import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { SALE_CREATE_SALE_CODE } from 'redux-saga/actions';
import { BASE_URI, notificationError, notificationSuccess } from 'utils/common';
import Cookies from 'js-cookie';
import * as dateFns from 'date-fns';

const createSaleCode = async (param: any) => {
  console.log(param);
  var result = new Date();
  result.setDate(result.getDate() + param.expired);
  return Axios.post(
    `${BASE_URI}api/sale/`,
    {
      name: param.name,
      discount: param.discount,
      date: dateFns.format(result, 'yyyy-MM-dd'),
      restaurant: param.restaurant,
    },
    { headers: { Authorization: `Token  ${Cookies.get('userInfo')}` } }
  )
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
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

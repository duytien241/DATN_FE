import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { ORDER_UPDATE_ORDER } from 'redux-saga/actions';
import { BASE_URI, notificationError, notificationSuccess } from 'utils/common';
import Cookies from 'js-cookie';

const updateOrder = async (param: any) => {
  console.log(param);
  return Axios.put(
    `${BASE_URI}api/orders/${param.id}/`,
    {
      status: param.status,
    },
    { headers: { Authorization: `Token  ${Cookies.get('userInfo')}` } }
  )
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
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

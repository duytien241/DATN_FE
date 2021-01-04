import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { PLACE_ORDER } from 'redux-saga/actions';
import { BASE_URI, notificationError, notificationSuccess } from 'utils/common';
import Cookies from 'js-cookie';

const placeOrder = async (param: any) => {
  console.log(param);
  return Axios.post(
    `${BASE_URI}api/orders/`,
    {
      user: 2,
      address_ship: param.address,
      phone: param.phone,
      total_cost: param.total,
      status: 'Chưa giao hàng',
      order_detail: '',
      restaurant: param.id_user,
      note: param.note,
      time_order: Date().toLocaleString(),
    },
    { headers: { Authorization: `Token  ${Cookies.get('userInfo')}` } }
  )
    .then((res) => {
      console.log(param);
      (param.info as Obj[]).forEach((element) => {
        Axios.post(
          `${BASE_URI}api/order/`,
          {
            order: res.data.id,
            menu_item: element.id_food,
            quantity: element.qty,
            amount: element.total,
          },
          { headers: { Authorization: `Token  ${Cookies.get('userInfo')}` } }
        )
          .then((res) => {
            console.log(res);
            // this.state.carts.forEach((element) => {
            //   axios
            //     .delete(`http://127.0.0.1:8000/v1/cart/` + element.id, {
            //       headers: { Authorization: `Token  ${Cookies.get('user_token')}` },
            //     })
            //     .then((res) => {})
            //     .catch((error) => console.log(error));
            // });
            // this.openNotification();
            // window.location.href = '/history_order';
          })
          .catch((error) => console.log(error));
      });
    })
    .catch((error) => console.log(error));
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

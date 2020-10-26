import Axios from 'axios';
import qs from 'querystring';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { ADMIN_DECISION_SHOP_REGISTER, ADMIN_QUERY_SHOP_PENDING_LIST } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios, notificationError, notificationSuccess } from 'utils/common';

const queryShopPendingList = async (param: any) => {
  return await Axios.get(`${BASE_URI}api/v1/user/unApproved`);
};

const decisionShopRegister = async (param: any) => {
  return await Axios.put(`${BASE_URI}api/v1/user/approved`, qs.stringify(param), configHeaderAxios);
};

function* doActionShopPending(request: Request<Obj>) {
  try {
    let payload = null;
    if (request.type === ADMIN_QUERY_SHOP_PENDING_LIST) {
      payload = yield queryShopPendingList(request.data);
    } else if (request.type === ADMIN_DECISION_SHOP_REGISTER) {
      payload = yield decisionShopRegister(request.data);
      notificationSuccess({ content: 'Cập nhật thành công' });
    }
    yield put({
      type: (request.response as any).success,
      payload,
    });
  } catch (error) {
    console.log(error.message);
    if (request.type === ADMIN_DECISION_SHOP_REGISTER) {
      notificationError({ content: error.message });
    }
  }
}

export function* watchQueryShopPendingList() {
  yield takeLatest(ADMIN_QUERY_SHOP_PENDING_LIST, doActionShopPending);
}

export function* watchDecisionShopRegister() {
  yield takeLatest(ADMIN_DECISION_SHOP_REGISTER, doActionShopPending);
}

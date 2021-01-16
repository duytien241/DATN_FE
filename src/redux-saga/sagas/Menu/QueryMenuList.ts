import Axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import { MENU_QUERY_FOOD_IN_MENU, MENU_QUERY_MENU_SHOP } from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios } from 'utils/common';
import Cookies from 'js-cookie';

const queryMenuList = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/shop/menu`, {
    headers: { Authorization: `Token  ${Cookies.get('userInfo')}` },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

const queryFoodInMenu = async (param: Obj) => {
  return await Axios.get(`${BASE_URI}api/v1/menu/food`, {
    params: param,
    headers: configHeaderAxios,
  });
};

function* doQueryMenuList(request: Request<Obj>) {
  try {
    let payload = null;
    if (request.type === MENU_QUERY_MENU_SHOP) {
      payload = yield queryMenuList(request.data);
    } else if (request.type === MENU_QUERY_FOOD_IN_MENU) {
      payload = yield queryFoodInMenu(request.data);
    }
    yield put({
      type: (request.response as any).success,
      payload: payload,
    });
  } catch (error) {
    console.log(error.message);
  }
}

export function* watchQueryFoodList() {
  yield takeLatest(MENU_QUERY_MENU_SHOP, doQueryMenuList);
}

export function* watchQueryFoodInMenu() {
  yield takeLatest(MENU_QUERY_FOOD_IN_MENU, doQueryMenuList);
}

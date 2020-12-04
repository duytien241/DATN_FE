import Axios from 'axios';
import qs from 'querystring';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import {
  MENU_CREATE_MENU_SHOP,
  MENU_UPDATE_MENU_SHOP,
  MENU_INSERT_FOOD_MENU_SHOP,
  MENU_DELETE_FOOD_MENU_SHOP,
  MENU_DELETE_MENU_SHOP,
} from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios, notificationError, notificationSuccess } from 'utils/common';

const createMenu = async (param: any) => {
  return await Axios.post(`${BASE_URI}api/v1/menu/create`, qs.stringify(param), configHeaderAxios);
};

const updateMenu = async (param: any) => {
  return await Axios.put(`${BASE_URI}api/v1/menu/update`, qs.stringify(param), configHeaderAxios);
};

const deleteMenu = async (param: any) => {
  return await Axios.put(`${BASE_URI}api/v1/menu/delete/menu`, qs.stringify(param), configHeaderAxios);
};

const insertFoodInMenu = async (param: any) => {
  return await Axios.post(`${BASE_URI}api/v1/menu/insert`, qs.stringify(param), configHeaderAxios);
};

const deleteFoodInMenu = async (param: any) => {
  return await Axios.put(`${BASE_URI}api/v1/menu/delete`, qs.stringify(param), configHeaderAxios);
};

function* doActionMenu(request: Request<Obj>) {
  try {
    let payload = null;
    if (request.type === MENU_CREATE_MENU_SHOP) {
      payload = yield createMenu(request.data);
      notificationSuccess({ content: 'Thêm thành công' });
    } else if (request.type === MENU_UPDATE_MENU_SHOP) {
      payload = yield updateMenu(request.data);
      notificationSuccess({ content: 'Cập nhật thành công' });
    } else if (request.type === MENU_INSERT_FOOD_MENU_SHOP) {
      payload = yield insertFoodInMenu(request.data);
      notificationSuccess({ content: 'Thêm thành công' });
    } else if (request.type === MENU_DELETE_FOOD_MENU_SHOP) {
      payload = yield deleteFoodInMenu(request.data);
      notificationSuccess({ content: 'Xóa thành công' });
    } else if (request.type === MENU_DELETE_MENU_SHOP) {
      payload = yield deleteMenu(request.data);
      notificationSuccess({ content: 'Xóa thành công' });
    }
    yield put({
      type: (request.response as any).success,
      payload,
    });
  } catch (error) {
    console.log(error.message);
    notificationError({ content: error.message });
  }
}

export function* watchCreateMenu() {
  yield takeLatest(MENU_CREATE_MENU_SHOP, doActionMenu);
}

export function* watchUpdateMenu() {
  yield takeLatest(MENU_UPDATE_MENU_SHOP, doActionMenu);
}

export function* watchDeleteMenu() {
  yield takeLatest(MENU_DELETE_MENU_SHOP, doActionMenu);
}

export function* watchInsertFoodInMenu() {
  yield takeLatest(MENU_INSERT_FOOD_MENU_SHOP, doActionMenu);
}

export function* watchDeleteFoodInMenu() {
  yield takeLatest(MENU_DELETE_FOOD_MENU_SHOP, doActionMenu);
}

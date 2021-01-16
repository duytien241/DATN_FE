import Axios from 'axios';
import qs from 'querystring';
import { put, takeLatest } from 'redux-saga/effects';
import { Obj, Request } from 'interfaces/common';
import {
  FOOD_CREATE_FOOD,
  FOOD_UPDATE_FOOD,
  FOOD_DELETE_FOOD_MANAGE,
  FOOD_CHANGE_FOOD_STATUS,
} from 'redux-saga/actions';
import { BASE_URI, configHeaderAxios, notificationError, notificationSuccess } from 'utils/common';
import Cookies from 'js-cookie';

const uploadFile = (input: FileList, id: number) => {
  if (input != null) {
    const file: File = input[0];
    const form = new FormData();
    form.append('type', 'file');
    form.append('image', file);
    form.append('id_food', `${id}`);

    console.log(form);

    return Axios.post(`${BASE_URI}api/v1/image/upload`, form, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
  } else {
    return null;
  }
};

const createFood = async (param: any) => {
  console.log(param);
  return Axios.post(
    `${BASE_URI}api/shop/menu/`,
    {
      name: param.name,
      description: param.info,
      price: param.price,
      image_url: param.image ? param.image : 'http://localhost:3003/static/media/defaultFood.png',
      restaurant: param.restaurant,
    },
    { headers: { Authorization: `Token  ${Cookies.get('userInfo')}` } }
  )
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

const updateFood = async (param: any) => {
  return await Axios.put(`${BASE_URI}api/shop/menu`, qs.stringify(param), configHeaderAxios);
};

const deleteFoodManage = async (param: any) => {
  return Axios.delete(`${BASE_URI}api/shop/menu/${param.id}`, {
    headers: { Authorization: `Token  ${Cookies.get('userInfo')}` },
  })
    .then((res) => {
      return res;
    })
    .catch((error) => console.log(error));
};

const changeFoodStatus = async (param: any) => {
  return await Axios.put(
    `${BASE_URI}api/v1/food/changeStatus
`,
    qs.stringify(param),
    configHeaderAxios
  );
};

function* doActionFood(request: Request<Obj>) {
  try {
    let payload = null;
    if (request.type === FOOD_CREATE_FOOD) {
      payload = yield createFood(request.data);
      if (request.data.image != null) {
        yield uploadFile(request.data.image, payload.data.data.insertId);
      }
      notificationSuccess({ content: 'Thêm thành công' });
    } else if (request.type === FOOD_UPDATE_FOOD) {
      if (request.data.image != null) {
        yield uploadFile(request.data.image, request.data.id_food);
      }
      request.data.id = request.data.id_food;
      delete request.data.image;
      delete request.data.id_food;
      payload = yield updateFood(request.data);
      notificationSuccess({ content: 'Cập nhật thành công' });
    } else if (request.type === FOOD_DELETE_FOOD_MANAGE) {
      payload = yield deleteFoodManage(request.data);
      notificationSuccess({ content: 'Xóa thành công' });
    } else if (request.type === FOOD_CHANGE_FOOD_STATUS) {
      payload = yield changeFoodStatus(request.data);
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

export function* watchCreateFood() {
  yield takeLatest(FOOD_CREATE_FOOD, doActionFood);
}

export function* watchUpdateFood() {
  yield takeLatest(FOOD_UPDATE_FOOD, doActionFood);
}

export function* watchDeleteFoodManage() {
  yield takeLatest(FOOD_DELETE_FOOD_MANAGE, doActionFood);
}

export function* watchChangeStatusFood() {
  yield takeLatest(FOOD_CHANGE_FOOD_STATUS, doActionFood);
}

import { ORDER_FOOD, DELETE_FOOD } from 'redux-saga/actions';
import { Obj, Request } from 'interfaces/common';
import { put, takeLatest } from 'redux-saga/effects';
import { DELETE_SUCCESS, ORDER_SUCCESS } from 'components/reducers';

function* doOrderFood(request: Request<Obj>) {
  console.log(request);
  if (request.type === ORDER_FOOD) {
    yield put({ type: ORDER_SUCCESS, payload: request.data });
  } else if (request.type === DELETE_FOOD) {
    console.log('delete aaa');
    yield put({ type: DELETE_SUCCESS, payload: request.data });
  }
}

export function* watchAddOrderFood() {
  yield takeLatest(ORDER_FOOD, doOrderFood);
}

export function* watchDelOrderFood() {
  yield takeLatest(DELETE_FOOD, doOrderFood);
}

import { AUTHENTICATION_REGISTER, USER_UPDATE_INFO_USER } from 'redux-saga/actions';
import { FORM_TYPE } from 'utils/common';
import {
  AUTHENTICATION_REGISTER_FAILED,
  AUTHENTICATION_REGISTER_SUCCESS,
  USER_UPDATE_INFO_USER_SUCCESS,
  USER_UPDATE_INFO_USER_FAILED,
} from './reducers';

export const register = (data: any) => ({
  type: AUTHENTICATION_REGISTER,
  data,
  action: FORM_TYPE.CREATE,
  response: {
    success: AUTHENTICATION_REGISTER_SUCCESS,
    failed: AUTHENTICATION_REGISTER_FAILED,
  },
});

export const updateUserInfo = (data: any) => ({
  type: USER_UPDATE_INFO_USER,
  data,
  action: FORM_TYPE.UPDATE,
  response: {
    success: USER_UPDATE_INFO_USER_SUCCESS,
    failed: USER_UPDATE_INFO_USER_FAILED,
  },
});

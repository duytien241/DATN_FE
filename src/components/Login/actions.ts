import { AUTHENTICATION_LOGIN, AUTHENTICATION_LOG_OUT } from 'redux-saga/actions';
import {
  AUTHENTICATION_LOGIN_FAILED,
  AUTHENTICATION_LOGIN_SUCCESS,
  AUTHENTICATION_LOG_OUT_SUCCESS,
  AUTHENTICATION_LOG_OUT_FAILED,
} from './reducers';

export const login = (data: any) => ({
  type: AUTHENTICATION_LOGIN,
  data,
  response: {
    success: AUTHENTICATION_LOGIN_SUCCESS,
    failed: AUTHENTICATION_LOGIN_FAILED,
  },
});

export const logOut = () => ({
  type: AUTHENTICATION_LOG_OUT,
  response: {
    success: AUTHENTICATION_LOG_OUT_SUCCESS,
    failed: AUTHENTICATION_LOG_OUT_FAILED,
  },
});

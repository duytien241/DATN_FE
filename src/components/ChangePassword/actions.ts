import { AUTHENTICATION_CHANGE_PASSWORD } from 'redux-saga/actions';
import { AUTHENTICATION_CHANGE_PASSWORD_SUCCESS, AUTHENTICATION_CHANGE_PASSWORD_FAILED } from './reducers';

export const changePassword = (data: any) => ({
  type: AUTHENTICATION_CHANGE_PASSWORD,
  data,
  action: 'CHANGE_PASSWORD',
  response: {
    success: AUTHENTICATION_CHANGE_PASSWORD_SUCCESS,
    failed: AUTHENTICATION_CHANGE_PASSWORD_FAILED,
  },
});

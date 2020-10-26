import { ToastOptions } from 'react-toastify';
import { AnyAction } from 'redux';

export interface Obj {
  [key: string]: {} | undefined;
}

export interface Action<T> {
  type: string;
  payload: T;
  showLoading?: boolean;
  hideLoading?: boolean;
  errorMessage?: string;
  errorCode?: string;
  isResponse?: boolean;
}

export interface Request<T> extends AnyAction {
  response?: ResponseType;
  payload?: T;
  showNotification?: boolean;
  notification?: ToastOptions;
}

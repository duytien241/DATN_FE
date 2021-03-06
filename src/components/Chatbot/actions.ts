import { Obj, Request } from 'interfaces/common';
import { CHATBOT_ADD_NEW_USER_MESSAGE } from 'redux-saga/actions';
import { MESSAGE_SENDER } from './reducers';

export const ADD_NEW_RESPONSE_MESSAGE = 'ADD_NEW_RESPONSE_MESSAGE';
export const ADD_NEW_USER_MESSAGE = 'ADD_NEW_USER_MESSAGE';
export const CHATBOT_SHOW_LOGIN_FORM = 'CHATBOT_SHOW_LOGIN_FORM';
export const CHATBOT_SHOW_ORDER_FORM = 'CHATBOT_SHOW_ORDER_FORM';
export const CHATBOT_SHOW_REGISTER_FORM = 'CHATBOT_SHOW_REGISTER_FORM';
export const TRIGGER_LOADER = 'TRIGGER_LOADER';
export const CHATBOT_SHOW_STOCK_INFO_LIST = 'CHATBOT_SHOW_STOCK_INFO_LIST';
export const SHOW_STOCK_BALANCE = 'SHOW_STOCK_BALANCE';
export const SHOW_SYMBOL_HEADER = 'SHOW_SYMBOL_HEADER';

export const addUserMessage = (
  payload: Obj,
  componentId?: string
): Request<Record<string, Obj | number | string | {} | undefined> | null> => {
  return {
    type: ADD_NEW_USER_MESSAGE,
    payload: {
      sender: MESSAGE_SENDER.CLIENT,
      showAvatar: false,
      text: payload,
      timestamp: new Date(),
      type: 'text',
    },
    componentId,
  };
};

export const triggerLoader = (
  payload: Obj,
  componentId?: string
): Request<Record<string, Obj | number | string | {} | undefined> | null> => {
  return {
    type: TRIGGER_LOADER,
    payload: {
      sender: MESSAGE_SENDER.RESPONSE,
      showAvatar: true,
      text: payload,
      timestamp: new Date(),
      type: 'text',
    },
    componentId,
  };
};

export const chatbotAddNewMessage = (payload: Obj, componentId?: string, type?: string) => {
  return {
    type: type ? type : CHATBOT_ADD_NEW_USER_MESSAGE,
    payload: payload,
    componentId: componentId,
  };
};

export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const changeLoginFormInfo = (type: string, payload: string, componentId?: string) => ({
  type,
  payload,
  componentId,
});

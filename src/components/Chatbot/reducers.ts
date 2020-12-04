import { Obj } from 'interfaces/common';
import { CHATBOT_ADD_USER_MESSAGE } from 'redux-saga/actions';

export enum MESSAGE_SENDER {
  CLIENT = 'client',
  RESPONSE = 'response',
}

export enum MESSAGE_ACTION {
  RESPONSE = 'RESPONSE',
  NON_RESPONSE = 'NON_RESPONSE',
}

export enum MESSAGE_TYPE {
  TEXT = 'text',
  COMPONENT = 'component',
  COMPONENT_WITH_TEXT = 'component_with_text',
  TYPING = 'typing',
}

export interface Mes {
  action?: string;
  type: MESSAGE_TYPE;
  sender: MESSAGE_SENDER;
  senderId?: string;
  text?: string;
  unread?: boolean;
  timestamp?: Date;
  showAvatar?: boolean;
  style?: string;
  component?: {
    value: string;
    props?: Obj;
  };
  [key: string]: any;
}

export const Messages = (state: Mes[] = [], action: any) => {
  switch (action.type) {
    case CHATBOT_ADD_USER_MESSAGE:
      return state.concat([action.payload]);
    default:
      return state;
  }
};

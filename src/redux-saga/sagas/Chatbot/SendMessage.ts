import { takeEvery } from 'redux-saga/effects';
import { CHATBOT_ADD_NEW_USER_MESSAGE, CHATBOT_ADD_USER_MESSAGE } from 'redux-saga/actions';
import store from 'redux-saga/store';
import {} from 'redux-saga/actions';
import { Obj, Request } from 'interfaces/common';
import { Global } from 'global/common';
import { getKey } from 'utils/common';

export const sendMessage = (payload?: Obj) => {
  if (Global.socketChatbot != null) {
    store.dispatch({
      type: CHATBOT_ADD_USER_MESSAGE,
      payload,
    });

    const event = Global.config?.connectionInfo?.chatbotInfo?.user_event as string;
    console.log(`${event}${getKey('chatbotId')}`);
    Global.socketChatbot.publish(`${event}${getKey('chatbotId')}`, {
      text: payload?.text as string,
      id: getKey('chatbotId'),
    });
  }
};
function* doSendMessage(request: Request<Obj>) {
  console.log(request.payload);

  yield sendMessage(request.payload);
}

export function* watchSendMessage() {
  yield takeEvery(CHATBOT_ADD_NEW_USER_MESSAGE, doSendMessage);
}

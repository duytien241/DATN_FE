import { takeEvery } from 'redux-saga/effects';
import { CHATBOT_ADD_NEW_USER_MESSAGE, CHATBOT_ADD_USER_MESSAGE } from 'redux-saga/actions';
import store from 'redux-saga/store';
import {} from 'redux-saga/actions';
import { Obj, Request } from 'interfaces/common';
import { Global } from 'global/common';
import { getKey } from 'utils/common';

const sendMessage = (payload?: Obj) => {
  if (Global.socketChatbot != null) {
    store.dispatch({
      type: CHATBOT_ADD_USER_MESSAGE,
      payload,
    });

    const event = Global.config?.connectionInfo?.chatbotInfo?.user_event as string;
    Global.socketChatbot.emit(`${event}${getKey('chatbotId')}`, payload?.text as string);
  }
};
function* doSendMessage(request: Request<Obj>) {
  console.log(request.payload);

  yield sendMessage(request.payload);
}

export function* watchSendMessage() {
  yield takeEvery(CHATBOT_ADD_NEW_USER_MESSAGE, doSendMessage);
}

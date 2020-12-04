import { Global } from 'global/common';
import { CHATBOT_ADD_USER_MESSAGE, SOCKET_INIT_SOCKET } from 'redux-saga/actions';
import { takeLatest } from 'redux-saga/effects';
import { getKey, setKey } from 'utils/common';
import { SCClientSocket, create } from 'socketcluster-client';
import * as scCodecMinBin from 'sc-codec-min-bin';
import { Obj } from 'interfaces/common';
import store from 'redux-saga/store';
import { MESSAGE_SENDER, MESSAGE_TYPE } from 'components/Chatbot/reducers';

const subscribeChat = () => {
  if (Global.socketChatbot != null) {
    const channelName = `bot_uttered${getKey('chatbotId')}`;
    const subscribeChannelStatus = Global.socketChatbot?.subscribe(channelName);
    subscribeChannelStatus.watch((res: Obj) => {
      const text = res.text as string;
      store.dispatch({
        type: CHATBOT_ADD_USER_MESSAGE,
        payload: {
          sender: MESSAGE_SENDER.RESPONSE,
          showAvatar: true,
          text: text,
          timestamp: new Date(),
          type: MESSAGE_TYPE.TEXT,
        },
      });
    });
  }
};

const connect = async () => {
  Global.config.connectionInfo.chatbot.codecEngine = scCodecMinBin;
  console.log(Global.config.connectionInfo);
  Global.socketChatbot = create(Global.config.connectionInfo.chatbot);

  Global.socketChatbot.on('error', (err: Error) => {
    console.log(err);
  });

  Global.socketChatbot.on('connect', async (status: SCClientSocket.ConnectStatus) => {
    console.log(Global.socketChatbot.id);
    setKey('chatbotId', Global.socketChatbot.id);
    subscribeChat();
  });
};

function* doInitSocket() {
  yield connect();
}

export default function* watchInitSocket() {
  yield takeLatest(SOCKET_INIT_SOCKET, doInitSocket);
}

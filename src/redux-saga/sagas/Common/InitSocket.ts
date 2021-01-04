import { Global } from 'global/common';
import { CHATBOT_ADD_NEW_USER_MESSAGE, CHATBOT_ADD_USER_MESSAGE, SOCKET_INIT_SOCKET } from 'redux-saga/actions';
import { takeLatest } from 'redux-saga/effects';
import { getKey, isBlank, setKey } from 'utils/common';
import { SCClientSocket, create } from 'socketcluster-client';
import * as scCodecMinBin from 'sc-codec-min-bin';
import { Obj } from 'interfaces/common';
import store from 'redux-saga/store';
import { MESSAGE_SENDER, MESSAGE_TYPE } from 'components/Chatbot/reducers';
import Axios from 'axios';

const subscribeChat = () => {
  if (Global.socketChatbot != null) {
    const channelName = `bot_uttered${getKey('chatbotId')}`;
    const subscribeChannelStatus = Global.socketChatbot?.subscribe(channelName);
    subscribeChannelStatus.watch((res: Obj) => {
      // const text = res.text as string;
      let responseData = null as any;
      if ((res.text as string).includes('action')) {
        responseData = JSON.parse(res.text as string);
      } else {
        responseData = res.text;
      }
      console.log(responseData);
      if (typeof responseData === 'object') {
        let arr_sym = null;
        if (!isBlank(responseData.arr_options)) {
          arr_sym = (responseData.arr_options as string).split(',');
        }
        if (!isBlank(responseData.text)) {
          store.dispatch({
            type: CHATBOT_ADD_USER_MESSAGE,
            payload: {
              sender: MESSAGE_SENDER.RESPONSE,
              showAvatar: true,
              text: responseData.text,
              timestamp: new Date(),
              type: MESSAGE_TYPE.TEXT,
            },
          });
        }
        if (responseData.action === 'SHOW_LIST_OPTIONS') {
          store.dispatch({
            type: CHATBOT_ADD_USER_MESSAGE,
            payload: {
              sender: MESSAGE_SENDER.RESPONSE,
              showAvatar: true,
              component: {
                value: responseData.action,
                props: {
                  options: arr_sym,
                },
              },
              timestamp: new Date(),
              type: MESSAGE_TYPE.COMPONENT,
            },
          });
        }
        if (responseData.action === 'SAVE_SEARCH') {
          console.log(responseData);
          store.dispatch({
            type: CHATBOT_ADD_USER_MESSAGE,
            payload: {
              sender: MESSAGE_SENDER.RESPONSE,
              showAvatar: true,
              component: {
                value: responseData.action,
                props: {
                  options: arr_sym,
                },
              },
              timestamp: new Date(),
              type: MESSAGE_TYPE.COMPONENT,
            },
          });
        }
        if (responseData.action === 'GET_ADDRESS') {
          let state = true;
          navigator.permissions
            .query({
              name: 'geolocation',
            })
            .then(function (result) {
              if (result.state == 'granted') {
                console.log(result.state);
              } else if (result.state == 'prompt') {
                console.log(result.state);
              } else if (result.state == 'denied') {
                state = false;
              }
              result.onchange = function () {
                console.log(result.state);
              };
            });
          if (!state) {
            store.dispatch({
              type: CHATBOT_ADD_NEW_USER_MESSAGE,
              payload: {
                sender: MESSAGE_SENDER.RESPONSE,
                text: 'Vui lòng cho phép chúng tôi truy cập vị trí của bạn.',
                showAvatar: false,
                timestamp: new Date(),
                type: MESSAGE_TYPE.TEXT,
              },
            });
          } else {
            navigator.geolocation.getCurrentPosition(function (position) {
              return Axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=20.9774367,105.78016009999999&sensor=true&key=AIzaSyCDFs3j4amVQv-mejlsdc-vw7-UtLiTL2g`
              )
                .then((res) => {
                  const results = (res.data as Obj).results as Obj[];
                  if (results.length > 0) {
                    store.dispatch({
                      type: CHATBOT_ADD_NEW_USER_MESSAGE,
                      payload: {
                        sender: MESSAGE_SENDER.CLIENT,
                        text: results[0].formatted_address,
                        showAvatar: false,
                        timestamp: new Date(),
                        type: MESSAGE_TYPE.TEXT,
                      },
                    });
                  }
                })
                .catch((error) => console.log(error));
            });
          }
        }
      } else {
        store.dispatch({
          type: CHATBOT_ADD_USER_MESSAGE,
          payload: {
            text: responseData,
            sender: MESSAGE_SENDER.RESPONSE,
            showAvatar: true,
            timestamp: new Date(),
            type: MESSAGE_TYPE.TEXT,
          },
        });
      }
      // store.dispatch({
      //   type: CHATBOT_ADD_USER_MESSAGE,
      //   payload: {
      //     sender: MESSAGE_SENDER.RESPONSE,
      //     showAvatar: true,
      //     text: text,
      //     timestamp: new Date(),
      //     type: MESSAGE_TYPE.TEXT,
      //   },
      // });
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

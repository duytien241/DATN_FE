import { SOCKET_INIT_SOCKET } from 'redux-saga/actions';
import { takeLatest } from 'redux-saga/effects';

const connect = async () => {
  const socket = new WebSocket('ws://localhost:8000');

  socket.onopen = () => {
    console.log('sssss');
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
  };
};

function* doInitSocket() {
  yield connect();
}

export default function* watchInitSocket() {
  yield takeLatest(SOCKET_INIT_SOCKET, doInitSocket);
}

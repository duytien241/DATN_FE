import { Config } from 'interfaces/common';
import { SCClientSocket } from 'socketcluster-client';

export namespace Global {
  export let socketChatbot: SCClientSocket;
  export let config: Config;
}

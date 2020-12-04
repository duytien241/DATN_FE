import React, { useRef } from 'react';
import Header from './Header';
import Sender from './Sender';
import MessageFrame from './MessageFrame';
import { MESSAGE_SENDER } from '../reducers';
import styles from './styles.scss';
import { Obj } from 'interfaces/common';

interface ConversationProps {
  title: string;
  titleAvatar: string;
  subTitle?: string;
  showCloseButton?: boolean;
  senderPlaceHolder?: string;
  loadingMessage?: boolean;

  setLoadingMessage?: (loading: boolean) => void;
  onTextInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
  sendMessage(event: React.FormEvent<HTMLFormElement>): void;
}

export default React.memo((props: ConversationProps) => {
  const messageFrameRef = useRef<{
    pushMessage(data: Obj): void;
  }>();

  const sendMesasgeContent = (event: React.FormEvent<HTMLFormElement>) => {
    const payload = {
      sender: MESSAGE_SENDER.CLIENT,
      showAvatar: false,
      text: (event.target as HTMLFormElement).message.value,
      timestamp: new Date(),
      type: 'text',
    };
    messageFrameRef.current?.pushMessage(payload);
    if (props.sendMessage) {
      props.sendMessage(event);
    }
  };

  return (
    <>
      <div className={styles.ConversationContainer}>
        <Header
          title={props.title}
          titleAvatar={props.titleAvatar}
          subTitle={props.subTitle}
          showCloseButton={props.showCloseButton}
        />
        <MessageFrame
          avatarBot={props.titleAvatar}
          ref={messageFrameRef}
          loadingMessage={props.loadingMessage}
          setLoadingMessage={props.setLoadingMessage}
        />
        <Sender
          onTextInputChange={props.onTextInputChange}
          sendMessage={sendMesasgeContent}
          placeHolder={props.senderPlaceHolder}
        />
      </div>
    </>
  );
});

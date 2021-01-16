import React, { forwardRef, useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import Message from './Message';
import { State } from 'redux-saga/reducers';
import { Mes, MESSAGE_SENDER, MESSAGE_TYPE } from 'components/Chatbot/reducers';
import styles from './styles.scss';
import { Obj } from 'interfaces/common';

interface MessageFrameProps {
  avatarBot?: string;
  cards?: Obj[];
  buttons?: Obj[];
  loadingMessage?: boolean;

  setLoadingMessage?: (loading: boolean) => void;
  onClickCard?(value: string): void;
  onClickButtonSlide?(value: string): void;
}

export default React.memo(
  forwardRef((props: MessageFrameProps) => {
    const { avatarBot } = props;

    const messages = useSelector((state: State) => state.messages);

    const scrollBarRef = useRef<Scrollbars>();

    useEffect(() => {
      if (messages.length > 0 && messages[messages.length - 1].sender === MESSAGE_SENDER.RESPONSE) {
        props.setLoadingMessage && props.setLoadingMessage(false);
      }
    }, [messages]);

    useEffect(() => {
      setTimeout(() => {
        scrollBarRef.current?.scrollTop(scrollBarRef.current.getScrollHeight());
      });
    }, [messages]);

    return (
      <Scrollbars
        className={styles.MessageFrame}
        autoHide={true}
        autoHideDuration={200}
        autoHideTimeout={1000}
        ref={scrollBarRef as React.RefObject<Scrollbars>}
      >
        <div className={styles.MessageSection}>
          <Message
            message={{
              sender: MESSAGE_SENDER.RESPONSE,
              showAvatar: true,
              timestamp: new Date(),
              text: 'Chào bạn, tôi là TienFood Assistant - Trợ lý ảo của công ty TienFood.',
              type: MESSAGE_TYPE.TEXT,
            }}
            avatarBot={avatarBot}
          />
          {messages &&
            messages.length > 0 &&
            messages.map((message: Mes, index: number) => {
              return <Message key={index} message={message} avatarBot={avatarBot} component={message.component} />;
            })}

          {props.loadingMessage && (
            <Message
              message={{ type: MESSAGE_TYPE.TYPING, sender: MESSAGE_SENDER.RESPONSE, showAvatar: true }}
              typing={true}
              avatarBot={avatarBot}
            />
          )}
        </div>
      </Scrollbars>
    );
  })
);

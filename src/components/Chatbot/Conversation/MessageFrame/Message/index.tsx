import React, { useEffect } from 'react';
import LoaderDots from '../LoaderDots';
import { Mes, MESSAGE_SENDER, MESSAGE_TYPE } from 'components/Chatbot/reducers';
import styles from './styles.scss';
import { Obj } from 'interfaces/common';

interface MessageProps {
  message: Mes;
  component?: {
    value: string;
    props?: Obj;
  };
  avatarBot?: string;
  typing?: boolean;
  detectSymbolPickerPosition?: (symbolPickerRef: React.RefObject<HTMLDivElement>) => void;
}

export default React.memo((props: MessageProps) => {
  const renderTextMessage = () => (
    <div className={`${styles.Message} ${isUser === true ? styles.UserMessage : styles.BotMessage}`}>
      {message.showAvatar === true && avatarBot != null && (
        <img src={avatarBot as string} className={styles.ChatbotAvatarMessage} />
      )}
      {isUser !== true && <LoaderDots typing={false} />}
      <div className={`${styles.ChatMessage} `}>
        <div className={`${styles.Text} ${message.style ? message.style : ''}`}>
          <span>{message.text}</span>
        </div>
        <span className={styles.Time}>{/* <span>{message.timestamp}</span> */}</span>
      </div>
    </div>
  );

  const renderTyping = () => {
    return (
      <div className={`${styles.Message} ${styles.BotMessage}`}>
        {message.showAvatar === true && avatarBot != null && (
          <img src={avatarBot as string} className={styles.ChatbotAvatarMessage} />
        )}
        <div className={`${styles.ChatMessage} `}>{<LoaderDots typing={props.typing ? props.typing : false} />}</div>
      </div>
    );
  };

  const { message, avatarBot } = props;

  const isUser = message.sender === MESSAGE_SENDER.CLIENT;

  useEffect(() => {}, [props]);

  return (
    <>
      {message.type === MESSAGE_TYPE.TEXT
        ? renderTextMessage()
        : message.type === MESSAGE_TYPE.TYPING
        ? renderTyping()
        : null}
    </>
  );
});

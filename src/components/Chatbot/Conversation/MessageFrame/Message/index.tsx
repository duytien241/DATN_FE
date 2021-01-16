import React, { useEffect } from 'react';
import LoaderDots from '../LoaderDots';
import { Mes, MESSAGE_SENDER, MESSAGE_TYPE } from 'components/Chatbot/reducers';
// import ButtonsSlider from '../SliderButtons';
import styles from './styles.scss';
import { Obj } from 'interfaces/common';
import GridButtons from '../GridButtons';
import { sendMessage } from 'redux-saga/sagas/Chatbot/SendMessage';
import { BrowserRouter, Link } from 'react-router-dom';

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
const onClickOptions = (data: any) => {
  console.log(data);
  const payload = {
    sender: MESSAGE_SENDER.CLIENT,
    showAvatar: false,
    text: data,
    timestamp: new Date(),
    type: 'text',
  };
  sendMessage(payload);
};
export default React.memo((props: MessageProps) => {
  const componentProps = props.component?.props;
  console.log(componentProps);
  const COMPONENTS = {
    SHOW_LIST_OPTIONS: componentProps && (
      <GridButtons onClickButton={onClickOptions} slidesToShow={2} buttons={componentProps.options as Obj[]} />
    ),
    SAVE_SEARCH: componentProps && (
      <BrowserRouter>
        <Link to="/#/filter" target="_blank">
          Xem thêm tại: đây
        </Link>
      </BrowserRouter>
    ),
  };

  const renderComponentMessage = () => <>{COMPONENTS[props.component?.value!]}</>;
  const renderTextMessage = () => {
    let arr_meesage: string[] = [];
    if (message.text) {
      arr_meesage = message.text.split('\n');
    }
    console.log(arr_meesage);
    return (
      <div className={`${styles.Message} ${isUser === true ? styles.UserMessage : styles.BotMessage}`}>
        {message.showAvatar === true && avatarBot != null && (
          <img src={avatarBot as string} className={styles.ChatbotAvatarMessage} />
        )}
        {isUser !== true && <LoaderDots typing={false} />}
        <div className={`${styles.ChatMessage} `}>
          <div className={`${styles.Text} ${message.style ? message.style : ''}`}>
            {arr_meesage.map((mess) => (
              <p>{mess}</p>
            ))}
          </div>
          <span className={styles.Time}>{/* <span>{message.timestamp}</span> */}</span>
        </div>
      </div>
    );
  };

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
        : renderComponentMessage()}
    </>
  );
});

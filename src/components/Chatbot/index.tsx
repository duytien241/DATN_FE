import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { handleError } from 'utils/common';
import Conversation from './Conversation';
import ToggleButton from './ToggleButton';
import Fallback from 'components/Fallback';
import { chatbotAddNewMessage } from './actions';
import { MESSAGE_SENDER } from './reducers';
import styles from './styles.scss';

interface ChatbotProps {
  title: string;
  titleAvatar: string;
  subTitle?: string;
  senderPlaceHolder?: string;
  profileAvatar?: string;
  showCloseButton?: boolean;
  autoFocus?: boolean;
  chatId?: string;
  showTimeStamp?: boolean;
  showChat?: boolean;

  handleSubmit?(): void;
  handleTextInputChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

export default React.memo((props: ChatbotProps) => {
  const dispatch = useDispatch();
  const [showChat, setShowChat] = useState(props.showChat ? props.showChat : false);
  const [loadingMessage, setLoadingMessage] = useState(false);

  const handleMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInput = (event.target as HTMLFormElement).message.value;
    (event.target as HTMLFormElement).message.value = '';
    handleNewUserMessage(userInput);
  };

  const onToggleConversation = () => {
    setShowChat(!showChat);
  };

  const handleNewUserMessage = (newMessage: string) => {
    if (newMessage.trim() !== '') {
      dispatch(
        chatbotAddNewMessage({
          sender: MESSAGE_SENDER.CLIENT,
          showAvatar: false,
          text: newMessage,
          timestamp: new Date(),
          type: 'text',
        })
      );
      setLoadingMessage(true);
    }
  };

  return (
    <ErrorBoundary onError={handleError} FallbackComponent={Fallback}>
      <div className={`${styles.ChatWidgetContainer} ${showChat ? styles.Active : ''}`}>
        {showChat && (
          <Conversation
            title={props.title}
            titleAvatar={props.titleAvatar}
            subTitle={props.subTitle}
            showCloseButton={props.showCloseButton}
            senderPlaceHolder={'Nhập tin nhắn'}
            sendMessage={handleMessageSubmit}
            onTextInputChange={props.handleTextInputChange!}
            loadingMessage={loadingMessage}
            setLoadingMessage={(loading) => {
              setLoadingMessage(loading);
            }}
          />
        )}
        <ToggleButton toggle={onToggleConversation} />
      </div>
    </ErrorBoundary>
  );
});

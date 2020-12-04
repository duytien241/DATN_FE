import React, { useRef } from 'react';
import { Button } from 'semantic-ui-react';
import styles from './styles.scss';

interface SenderProps {
  placeHolder?: string;

  onTextInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
  sendMessage(event: React.FormEvent<HTMLFormElement>): void;
}

export default (props: SenderProps) => {
  const inputRef = useRef(null);

  return (
    <form className={styles.Sender} onSubmit={props.sendMessage}>
      <input
        type={'text'}
        className={styles.InputMessage}
        name="message"
        ref={inputRef}
        autoFocus={true}
        autoComplete="off"
        onChange={props.onTextInputChange}
        placeholder={props.placeHolder}
      />
      <Button icon="send" className={styles.ButtonSend}></Button>
    </form>
  );
};

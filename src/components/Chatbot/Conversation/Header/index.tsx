import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './styles.scss';

interface HeaderProps {
  title: string;
  subTitle?: string;
  showCloseButton?: boolean;
  titleAvatar?: string;

  toggleChat?: () => void;
}

export default (props: HeaderProps) => {
  return (
    <div className={styles.ChatbotHeader}>
      <h4 className={styles.ChatbotTitle}>
        {props.titleAvatar && <img src={props.titleAvatar} className={styles.ChatbotAvatar} alt="profile" />}
        <div className={styles.TitleSection}>
          <div className={styles.Title}> {props.title}</div>
          <div className={styles.SubTitle}>{props.subTitle}</div>
        </div>
      </h4>
      {props.showCloseButton && (
        <Button className={styles.ChatbotCloseButton} onClick={props.toggleChat} icon="close" circular></Button>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import styles from './styles.scss';

interface ToggleButton {
  toggle: () => void;
}

export default ({ toggle }: ToggleButton) => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    toggle();
    setShowChat(true);
  };
  return (
    <button className={styles.ToggleButton} onClick={toggleChat}>
      {showChat ? (
        <img
          src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR35K_KX8Ssa485MI_K9PwJ9JHq4jb6Jjr4qQ&usqp=CAU'}
          className="rcw-open-launcher"
        />
      ) : (
        <img
          src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR35K_KX8Ssa485MI_K9PwJ9JHq4jb6Jjr4qQ&usqp=CAU'}
          className="rcw-open-launcher"
        />
      )}
    </button>
  );
};

import React from 'react';
import styles from './styles.scss';

interface LoaderDotsProps {
  typing: boolean;
}

export default (props: LoaderDotsProps) => {
  return (
    <div className={`${styles.LoaderDots} ${props.typing === true ? styles.ActiveLoader : ''}`}>
      <div className={styles.LoaderDotsContainer}>
        <span className={styles.LoaderDot}></span>
        <span className={styles.LoaderDot}></span>
        <span className={styles.LoaderDot}></span>
      </div>
    </div>
  );
};

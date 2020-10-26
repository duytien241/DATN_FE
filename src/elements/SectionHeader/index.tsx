import React from 'react';
import styles from './styles.scss';

export default ({ title }: { title: string }) => {
  return (
    <div className={styles.SectionHeader}>
      <h3>{title}</h3>
    </div>
  );
};

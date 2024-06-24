import React from 'react';
import styles from '../styles/PatternBackground.module.css';

const PatternBackground = ({ children }) => {
  return (
    <div className={styles.patternBackground}>
      {children}
    </div>
  );
};

export default PatternBackground;

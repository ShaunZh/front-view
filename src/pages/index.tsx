import React from 'react';
import DraftEditor from '@/components/DraftEditor';
import styles from './index.less';

export default () => {
  return (
    <div>
      <h1 className={styles.title}></h1>
      <DraftEditor></DraftEditor>
    </div>
  );
};

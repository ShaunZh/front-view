import React, { useState } from 'react';
import DraftEditor from '@/components/DraftEditor';
import { ContentState } from 'draft-js';
import styles from './index.less';

export default () => {
  const [draftInitState, setDraftInitState] = useState({
    blocks: [
      {
        key: 's0f9',
        text: 'qwqwqw',
        type: 'header-one',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '2jjcp',
        text: '驱蚊器无群',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'ce2lc',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'af5ee',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 1,
          },
        ],
        data: {},
      },
      {
        key: 'af5ef',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 0,
          },
        ],
        data: {},
      },
      {
        key: 'caicv',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'RADIO',
        mutability: 'IMMUTABLE',
        data: {
          title: '单选项标题',
          options: [
            {
              value: 1,
              label: '第一个选项',
              image:
                'https://www.draft-js-plugins.com/images/canada-landscape-small.jpg',
            },
            {
              value: 2,
              label: '第二个选项',
            },
          ],
        },
      },
      '1': {
        type: 'RADIO',
        mutability: 'IMMUTABLE',
        data: {
          title: '单选项标题',
          options: [
            {
              value: 1,
              label: '第一个选项',
            },
          ],
        },
      },
    },
  });
  const onEditDraftComponent = (data: any) => {};

  const onSaveDraftData = (draftRawContentState: any, renderData: any[]) => {
    setDraftInitState(draftRawContentState);
  };
  return (
    <div>
      <h1 className={styles.title}></h1>
      <DraftEditor
        onEditComponent={onEditDraftComponent}
        onSaveData={onSaveDraftData}
        initialState={draftInitState}
      ></DraftEditor>
    </div>
  );
};

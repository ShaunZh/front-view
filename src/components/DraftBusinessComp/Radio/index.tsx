import React from 'react';
import { ContentState } from 'draft-js';

import RadioCom from '../../Radio';

interface Props {
  contentState: ContentState;
  block: any;
  style: any;
}

export default (props: Props): React.ReactElement => {
  const { contentState, block, style, ...elementProps } = props;
  const content = contentState.getEntity(block.getEntityAt(0)).getData();

  return (
    <div {...elementProps} style={{ ...style }}>
      <RadioCom data={content}></RadioCom>
    </div>
  );
};

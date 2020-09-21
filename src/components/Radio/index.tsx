import React, { useState } from 'react';
import { ContentState } from 'draft-js';

import { Radio } from 'antd';

interface RadioItem {
  label: string;
  value: string;
  image?: string;
}

interface Props {
  data: {
    title: string;
    options: RadioItem[];
  };
  onChange?: (value: string) => void;
  readonly?: boolean;
}

interface State {}

export default (props: Props): React.ReactElement => {
  const { data, onChange, readonly = false } = props;
  const [value, setValue] = useState<string>('');
  // const content = contentState.getEntity(block.getEntityAt(0)).getData();
  const { title = '', options = [] } = data;
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  const onChangeCom = (e: any) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <div>
      <p>{title}</p>
      <Radio.Group onChange={onChangeCom} value={value} disabled={readonly}>
        {options.map((item: RadioItem) => (
          <Radio style={radioStyle} key={item.value} value={item.value}>
            {item.label && <span>{item.label}</span>}
            <div>
              {item.image && <img src={item.image} alt="radio-image" />}
            </div>
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

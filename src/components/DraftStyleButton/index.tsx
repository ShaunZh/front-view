/*
 * @Description: 样式按钮组件
 * @Author: Hexon
 * @Date: 2020-09-11 18:21:36
 * @LastEditors: Hexon
 * @LastEditTime: 2020-09-11 18:28:19
 */
import React, { useEffect, useState } from 'react';

interface Props {
  onToggle: (type: string) => void;
  active: boolean;
  label: string;
  style: string;
}

export default (props: Props) => {
  const { onToggle, active, label, style } = props;
  const [className, setClassName] = useState<string>('RichEditor-styleButton');

  const onMouseDown = () => {
    onToggle(style);
  };

  useEffect(() => {
    if (active) {
      setClassName('RichEditor-styleButton RichEditor-activeButton');
    } else {
      setClassName('RichEditor-styleButton');
    }
  }, [active]);

  return (
    <span className={className} onMouseDown={onMouseDown}>
      {label}
    </span>
  );
};

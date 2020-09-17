/*
 * @Description: 内联样式
 * @Author: Hexon
 * @Date: 2020-09-11 18:30:10
 * @LastEditors: Hexon
 * @LastEditTime: 2020-09-15 16:36:47
 */
import React from 'react';
import StyleButton from '../DraftStyleButton/';

interface Props {
  inlineStyles: IStyle[];
  onToggle: (inlineStyles: string) => void;
  editorState: any;
}

export default (props: Props) => {
  const { inlineStyles, editorState, onToggle } = props;
  // TODO: 确认该函数的具体用途
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {inlineStyles.map((type: IStyle) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

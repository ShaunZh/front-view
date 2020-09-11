/*
 * @Description: 块级样式
 * @Author: Hexon
 * @Date: 2020-09-11 18:30:10
 * @LastEditors: Hexon
 * @LastEditTime: 2020-09-11 18:59:54
 */
import React from 'react';
import StyleButton from '../DraftStyleButton';

interface Props {
  editorState: any;
  blockStyles: IStyle[];
  currentStyle: Set<string>;
  onToggle: () => void;
}

export default (props: Props) => {
  const { blockStyles, onToggle, editorState } = props;
  const selection = editorState.getSelection();
  // TODO: 确定以下函数的具体用途
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {blockStyles.map((type: IStyle) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

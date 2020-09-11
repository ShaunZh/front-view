import React, { useState, useRef, useEffect } from 'react';
import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const DraftEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // const editor = React.useRef(null);
  const styles = {
    editor: {
      border: '1px solid gray',
      minHeight: '6em',
    },
  };
  let defaultInlineStyle = [
    { el: <span style={{ fontWeight: 'bold' }}>B</span>, style: 'BOLD' },
    { el: <span style={{ fontStyle: 'italic' }}>I</span>, style: 'ITALIC' },
    {
      el: <span style={{ textDecoration: 'underline' }}>U</span>,
      style: 'UNDERLINE',
    },
    {
      el: (
        <span>
          <div className="color-show" style={{ backgroundColor: '#e24' }}></div>
        </span>
      ),
      style: 'RED',
    },
    {
      el: (
        <span>
          <div className="color-show" style={{ backgroundColor: '#39f' }}></div>
        </span>
      ),
      style: 'BLUE',
    },
    {
      el: (
        <span>
          <div className="color-show" style={{ backgroundColor: '#f93' }}></div>
        </span>
      ),
      style: 'ORANGE',
    },
    {
      el: (
        <span>
          <div className="color-show" style={{ backgroundColor: '#3a6' }}></div>
        </span>
      ),
      style: 'GREEN',
    },
  ];
  let customColorStyleMap = {
    RED: { color: '#e24' },
    BLUE: { color: '#39f' },
    ORANGE: { color: '#f93' },
    GREEN: { color: '#3a6' },
    Bold: {
      fontWeight: '600',
    },
    Italic: {
      fontStyle: 'italic',
    },
  };

  useEffect(() => {
    console.log('state: ', editorState);
    const contentState = editorState.getCurrentContent();
    console.log('contentState: ', contentState);
    console.log('convert contentState: ', convertToRaw(contentState));
  }, [editorState]);

  const toggleInlineStyle = (style: any) => {
    let state = RichUtils.toggleInlineStyle(editorState, style);
    setEditorState(state);
  };
  return (
    <div style={styles.editor}>
      <div className="editor-btn-group">
        {defaultInlineStyle.map(item => (
          <span onClick={() => toggleInlineStyle(item.style)} key={item.style}>
            {item.el}
          </span>
        ))}
      </div>
      <Editor
        // ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        customStyleMap={customColorStyleMap}
      />
    </div>
  );
};

export default DraftEditor;

import React, { useState, useRef, useEffect } from 'react';

import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  RichUtils,
  DraftBlockType,
  ContentBlock,
  getDefaultKeyBinding,
} from 'draft-js';

import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import '../../../node_modules/draft-js-focus-plugin/lib/plugin.css';

import createRadioBlockPlugin from './plugins/radioBlockPlugin';
// import '../../../node_modules/draft-js-image-plugin/lib/plugin.css';

import Editor, { composeDecorators } from 'draft-js-plugins-editor';

import BlockStyleControls from '../DraftBlockStyleControls';
import InlineStyleControls from '../DraftInlineStyleControls';
import 'draft-js/dist/Draft.css';
import './index.less';
import { insertRadioBlock } from './modifiers/insertRadioBlock';
import renderTreeGenerator, { getBlockData } from '../renderTreeGenerator';

import RenderH5 from '../RenderH5';

const focusPlugin = createFocusPlugin();
const decorator = composeDecorators(focusPlugin.decorator);
const imagePlugin = createImagePlugin({ decorator });
const radioBlockPlugin = createRadioBlockPlugin({ decorator });

const plugins = [imagePlugin, focusPlugin, radioBlockPlugin];

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];
const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const customBlockModules = ['RADIO', 'IMAGE'];

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

// 自定义渲染样式
// const blockRenderMap = Immutable.Map({
//   'header-two': {
//     element: 'h2',
//   },
//   unstyled: {
//     element: 'h2',
//   },
// });

/* eslint-disable */
const initialState = {
  blocks: [
    {
      key: '9gm3s',
      text:
        'You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'ov7r',
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
      key: 'e23a8',
      text: 'See advanced examples further down …',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'c8qfm',
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
      key: 'erjhc',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '7kpt',
      text: 'asfsfsffadsfsfdsfasfsfasfasdfasdfasfasdfasfsadfadf',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 0,
          length: 8,
          style: 'BOLD',
        },
        {
          offset: 21,
          length: 5,
          style: 'BOLD',
        },
        {
          offset: 14,
          length: 5,
          style: 'ITALIC',
        },
        {
          offset: 21,
          length: 5,
          style: 'UNDERLINE',
        },
      ],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {
    '0': {
      type: 'IMAGE',
      mutability: 'IMMUTABLE',
      data: {
        src:
          'https://www.draft-js-plugins.com/images/canada-landscape-small.jpg',
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
          {
            value: 2,
            label: '第二个选项',
          },
        ],
      },
    },
  },
};
/* eslint-enable */

/* eslint-disable */
const initialState1 = {
  entityMap: {
    '0': {
      type: 'colorBlock',
      mutability: 'IMMUTABLE',
      data: {},
    },
  },
  blocks: [
    {
      key: '9gm3s',
      text:
        'This is a simple example. Focus the block by clicking on it and change alignment via the toolbar.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'ov7r',
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
      key: 'e23a8',
      text:
        'More text here to demonstrate how inline left/right alignment works …',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};
/* eslint-enable */

interface Props {}
interface State {
  editorState: EditorState;
  renderData: any;
  radios: Map<string, string>;
}

class DraftEditor extends React.Component<Props> {
  state: State = {
    radios: new Map(),
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
    renderData: [],
  };

  onChange = (editorState: EditorState) => {
    this.setState({ editorState });
  };

  toggleBlockType = (blockType: DraftBlockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = (inlineStyle: string) => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle),
    );
  };

  getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
    }
    return '';
  };

  // 用于处理编辑器中的快捷命令，如：CMD + B(加粗)，CMD+i()斜体
  handleKeyCommand = (command: any, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // 定义
  mapKeyToEditorCommand = (e: React.KeyboardEvent<{}>) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */,
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };
  radioBlockPlugin = () => {};

  // blockRenderer = (block: any) => {
  //   if (block.getType() === 'atomic') {
  //     const contentState = this.state.editorState.getCurrentContent();
  //     const entity = block.getEntityAt(0);
  //     if (!entity) return null;
  //     const type = contentState.getEntity(entity).getType();
  //     if (type === 'RADIO' || type === 'radio') {
  //       return {
  //         component: decorator(Radio),
  //         editable: false,
  //       };
  //     }
  //     return null;
  //   }
  //   return null;
  // };

  insertRadios = () => {
    const newEditorState = insertRadioBlock(this.state.editorState);
    const blocks = newEditorState.getCurrentContent().getBlocksAsArray();
    // console.log(
    //   'blocks: ',
    //   newEditorState.getCurrentContent().getBlocksAsArray(),
    // );

    // console.log('newStat: ', convertToRaw(newEditorState.getCurrentContent()));
    this.setState({
      radios: new Map(),
      editorState: newEditorState,
    });
  };

  // 在该事件中将Draft.js 编辑器中的数据转换为rawContent，保存到数据库用于数据还原
  onBlur = () => {
    const renderData = renderTreeGenerator(
      this.state.editorState.getCurrentContent(),
      customBlockModules,
    );
    const contentRawData = this.state.editorState.getCurrentContent();
    this.setState({
      renderData,
    });
  };

  editComponent = () => {};
  focus = () => {
    var selectionState = this.state.editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = this.state.editorState.getCurrentContent();
    var currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const blockData = getBlockData(
      currentContentBlock,
      currentContent,
      customBlockModules,
    );
    // 说明是原子类型
    if (blockData) {
      console.log('atomic block: ', blockData);
    } else {
      console.log('富文本内容');
    }
    // 1. 获取所选择block的内容，包括block type和data

    this.editor.focus();
  };
  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    // console.log('contentState: ', contentState);
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="container">
        <div className="left">
          <div className="top">
            <h3>组件区</h3>
            <button onClick={this.insertRadios}>单选</button>
          </div>
          <div className="bottom"></div>
        </div>

        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
            blockStyles={BLOCK_TYPES}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
            inlineStyles={INLINE_STYLES}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              // blockRendererFn={this.blockRenderer}
              blockStyleFn={this.getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={true}
              // 自定义渲染样式: 主要用于传递内容到Draft.js中时进行渲染处理
              // blockRenderMap={blockRenderMap}
              plugins={plugins}
              onBlur={this.onBlur}
              ref={element => {
                this.editor = element;
              }}
            />
          </div>
        </div>
        <div className="right">
          <RenderH5 renderData={this.state.renderData}></RenderH5>
        </div>
      </div>
    );
  }
}

export default DraftEditor;

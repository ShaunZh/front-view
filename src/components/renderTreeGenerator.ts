import {
  ContentState,
  convertToRaw,
  RawDraftInlineStyleRange,
  ContentBlock,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// class RenderTreeGenerator {
//   contentState: ContentState;
//   customBlockModules: string[] ;

//   constructor(contentState: ContentState, customBlockModules: string[]) {
//     this.contentState = contentState;
//     this.customBlockModules = customBlockModules;
//   }

//   // 处理富文本
//   private _processRichText() {

//   }

//   static generate() {
//     const output = []
//     const currentBlock = []
//     const blocks = .contentState.getBlocksAsArray()
//   }
// }

interface InlineStyleRange {
  offset: number;
  lenght: number;
  style: 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'CODE';
}

// // draft 格式转html
// const unstyledToP = (data: string) => `<div>${data}</div>`;
// const headOneToH1 = (data: string) => `<h1>${data}</h1>`;
// const headTwoToH2 = (data: string) => `<h2>${data}</h2>`;
// const headThreeToH3 = (data: string) => `<h2>${data}</h2>`;
// const headFourToH4 = (data: string) => `<h2>${data}</h2>`;
// const headFiveToH5 = (data: string) => `<h2>${data}</h2>`;
// const headSixToH6 = (data: string) => `<h2>${data}</h2>`;
// const blockquote = (data: string) => `<blockquote>${data}</blockquote>`;
// const code = (data: string) => `<pre>${data}</pre>`;
// const listToLi = (data: string) => `<li>${data}</li>`;

// const draftToHtmlMap = new Map([
//   ['unstyled', unstyledToP],
//   ['header-one', headOneToH1],
//   ['header-two', headTwoToH2],
//   ['header-three', headThreeToH3],
//   ['header-four', headFourToH4],
//   ['header-five', headFiveToH5],
//   ['header-six', headSixToH6],
//   ['blockquote', blockquote],
//   ['code-block', code],
//   ['unordered-list-item', listToLi],
//   ['ordered-list-item', listToLi],
// ]);

// 将富文本的blocks转换为html
const processRichText = (blocks: any[]) => {
  const rawContentState = {
    blocks,
    entityMap: {},
  };
  const html = draftToHtml(rawContentState, undefined, undefined);
  return {
    type: 'RICHTEXT',
    data: html,
  };
};

// 获取原子类型的block data
export const getBlockData = (
  block: ContentBlock,
  contentState: ContentState,
  customBlockModules: string[],
) => {
  // 原子类型
  if (block.getEntityAt(0)) {
    const entity = contentState.getEntity(block.getEntityAt(0));
    const type = entity.getType();

    if (customBlockModules.includes(type)) {
      const entityData = entity.getData();
      return {
        type,
        data: entityData,
      };
    }
  }
  return null;
};
const renderTreeGenerator = (
  contentState: ContentState,
  customBlockModules: string[],
) => {
  const output = [];
  const blocks = contentState.getBlocksAsArray();
  const rawBlocks = convertToRaw(contentState).blocks || [];
  let currentBlock = 0;
  const blocskLength = blocks.length;

  while (currentBlock < blocskLength) {
    const block = blocks[currentBlock];
    const blockData = getBlockData(block, contentState, customBlockModules);
    // 原子类型
    if (blockData) {
      output.push(blockData);
    } else {
      // 富文本内容
      const html = processRichText([rawBlocks[currentBlock]]);
      output.push(html);
    }
    currentBlock++;
  }
  return output;
};

export default renderTreeGenerator;

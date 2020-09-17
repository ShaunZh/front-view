import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';

// const urlType = 'IMAGE';
//   const contentState = editorState.getCurrentContent();
//   const contentStateWithEntity = contentState.createEntity(
//     urlType,
//     'IMMUTABLE',
//     { ...extraData, src: url }
//   );
//   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//   const newEditorState = AtomicBlockUtils.insertAtomicBlock(
//     editorState,
//     entityKey,
//     ' '
//   );
//   return EditorState.forceSelection(
//     newEditorState,
//     newEditorState.getCurrentContent().getSelectionAfter()
//   );

export function insertRadioBlock(editorState: EditorState) {
  const type = 'RADIO';
  const contentState = editorState.getCurrentContent();
  console.group('插入input contentState');
  const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', {
    title: '单选项标题',
    options: [
      { value: 1, label: '第一个选项' },
      { value: 2, label: '第二个选项' },
    ],
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  // const newEditorState = AtomicBlockUtils.insertAtomicBlock(
  //   editorState,
  //   entityKey,
  //   ' '
  // );
  // return EditorState.forceSelection(
  //   newEditorState,
  //   newEditorState.getCurrentContent().getSelectionAfter()
  // );

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });
  console.groupEnd();
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}

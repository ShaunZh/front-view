import Radio from '../../DraftBusinessComp/Radio';

const createRadioBlockPlugin = (config: { decorator?: any } = {}) => {
  const component = config.decorator ? config.decorator(Radio) : Radio;
  return {
    blockRendererFn: (
      block: any,
      { getEditorState }: { getEditorState: any },
    ) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        if (type === 'RADIO') {
          return {
            component,
            editable: false,
          };
        }
      }
      return null;
    },
  };
};

export default createRadioBlockPlugin;

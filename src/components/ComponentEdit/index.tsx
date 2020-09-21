import React from 'react';
import RadioEdit from '../Radio/edit';

interface Props {
  type: string;
  data: any;
  updateEditorData: (data: any) => void;
}

const ComponentEdit: React.FC<Props> = (props: Props) => {
  const { type = '', data, updateEditorData } = props;

  const onChangeRadioData = (data: any) => {
    console.log('onChangeRadioData: ', data);
    updateEditorData({
      type,
      data,
    });
  };

  const editComponent = () => {
    if (type.toLocaleUpperCase() === 'RADIO') {
      return (
        <RadioEdit data={data} onChangeData={onChangeRadioData}></RadioEdit>
      );
    }
  };
  return <div className="component-edit">{editComponent()}</div>;
};

export default ComponentEdit;

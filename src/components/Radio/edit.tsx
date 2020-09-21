import React, { useEffect, useState } from 'react';
import { Radio, Checkbox, Input, Button } from 'antd';
import HOCRankOption from '../HOCRankOption';

interface OptionItem {
  label: string;
  value: string;
  iamge?: string;
}

interface IRadioData {
  must: boolean;
  title: string;
  rank: number;
  options: OptionItem[];
}

interface Props {
  // must: boolean;
  // title: string;
  // options: OptionItem[];
  data: IRadioData;
  onChangeData: (data: IRadioData) => void;
  // onChangeTitle: (value: string) => void;
  // onChangeOptions: (options: OptionItem[]) => void;
  // onChangeRank: (rank: number) => void;
}

interface OptionProps {
  label: string;
  onChangeInput: (value: string) => void;
  onDelete: () => void;
}

const Option: React.FC<OptionProps> = (props: OptionProps) => {
  const { label, onChangeInput, onDelete } = props;
  return (
    <>
      <Input
        type="text"
        value={label}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChangeInput(event.target.value)
        }
      ></Input>
      <Button onClick={onDelete}>删除</Button>
    </>
  );
};

const OpiontHoc = HOCRankOption(Option);

export default (props: Props): React.ReactElement => {
  // const [rankOption, setRank] = useState<number>();
  // const [rank, setRank] = useState<number>();

  const {
    data,
    onChangeData,
    // title = '',
    // must = false,
    // options = [],
    // onChangeTitle,
    // onChangeOptions,
    // onChangeRank,
  } = props;

  const onChangeDataLocal = (data: IRadioData) => {
    onChangeData(data);
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeDataLocal({
      ...data,
      title: event.target.value,
    });
  };

  // 更新选项排序
  const onChangeRank = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('rank option: ', event);
  };

  // 更新题目排序
  const onChangeRankProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('rank project: ', event);
  };

  const onChangeMust = (e: any) => {
    onChangeDataLocal({
      ...data,
      must: e.target.value,
    });
  };

  const onChangeInputOption = (index: number, value: string) => {
    const [...options] = data.options;
    options[index].label = value;
    onChangeDataLocal({
      ...data,
      options,
    });
  };

  const onDeleteOption = (index: number) => {
    const [...options] = data.options;
    options.splice(index, 1);
    onChangeDataLocal({
      ...data,
      options,
    });
  };

  // const option = (item: OptionItem, index: number) => {
  //   const OptionContent = (
  //     <>
  //       <Input
  //         type="text"
  //         value={item.label}
  //         onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
  //           onChangeInputOption(index, event.target.value)
  //         }
  //       ></Input>
  //       <Button onClick={() => onDeleteOption(index)}>删除</Button>
  //     </>
  //   );
  //   return HOCRankOption(OptionContent);
  // };

  // const = (item: OptionItem, index: number) => {
  //   const OptionContent = (
  //     <>
  //       <Input
  //         type="text"
  //         value={item.label}
  //         onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
  //           onChangeInputOption(index, event.target.value)
  //         }
  //       ></Input>
  //       <Button onClick={() => onDeleteOption(index)}>删除</Button>
  //     </>
  //   );
  //   return HOCRankOption(OptionContent);
  // };

  const onUpdateOptionRank = (oldRank: number, newRank: number) => {
    console.log('old rank: ', oldRank);
    console.log('new rank: ', newRank);
  };

  return (
    <div>
      <div className="title-wrap">
        <input type="number" value={data.rank} onBlur={onChangeRankProject} />
        <span>题目</span>
        <Input type="text" value={data.title} onChange={onChangeTitle}></Input>
        <Checkbox onChange={onChangeMust}>必填</Checkbox>
      </div>
      <div className="options">
        {data.options.map((item: OptionItem, index: number) => {
          return (
            <div className="option-item">
              <OpiontHoc
                {...item}
                onChangeInput={(value: string) =>
                  onChangeInputOption(index, value)
                }
                onDelete={() => onDeleteOption(index)}
                rank={index + 1}
                onUpdateRank={(newRank: number) =>
                  onUpdateOptionRank(index + 1, newRank)
                }
              ></OpiontHoc>
            </div>
          );
        })}
      </div>
    </div>
  );
};

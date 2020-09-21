import React from 'react';
import { Input } from 'antd';

interface State {
  rank: string | number;
}

interface Props {
  rank: string | number;
  onUpdateRank: (newRank: number) => void;
  [index: string]: any;
}

const HOCRankOption = (WrappedComponent: any) => {
  return class Rank extends React.Component<Props, State> {
    state: State = {
      rank: this.props.rank,
    };

    onBlur = () => {
      try {
        if (this.state.rank !== this.props.rank) {
          this.props.onUpdateRank(Number(this.state.rank));
        }
      } catch (e) {
        console.error(e.message);
      }
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const reg = /^[1-9]([0-9]*)?$/; // 以数字1开头，任意数字结尾，且中间出现零个或多个数字
      const value = e.target.value;
      if (reg.test(value) || value === '') {
        this.setState({
          rank: value,
        });
      }
    };

    render() {
      return (
        <div>
          <Input
            type="text"
            value={this.state.rank}
            onChange={this.onChange}
            onBlur={this.onBlur}
          ></Input>
          <WrappedComponent {...this.props}></WrappedComponent>
        </div>
      );
    }
  };
};

export default HOCRankOption;

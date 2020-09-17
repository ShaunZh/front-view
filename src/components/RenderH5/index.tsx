import React from 'react';
import Radio from '../Radio';
import xss from 'xss';

interface Props {
  renderData: any;
}

interface RenderDataItem {
  type: string;
  data: any;
  number?: string;
  isRemote?: boolean; // 是否远程获取数据
}

interface State {
  renderData: RenderDataItem[];
}

class ReaderH5 extends React.Component<Props, State> {
  state: State = {
    renderData: [],
  };

  componentDidMount() {
    const renderData = this.fetchData();
    this.setState({
      renderData,
    });
  }

  onChangeRadio = (number: string, value: string) => {};

  renderData = () => {
    // this.state.renderData
    const renderData = this.props.renderData;
    return (
      <div>
        {renderData
          .map((item: RenderDataItem, index: number) => {
            if (item.data) {
              if (item.type === 'RICHTEXT') {
                return (
                  <div dangerouslySetInnerHTML={{ __html: xss(item.data) }} />
                );
              } else if (item.type === 'RADIO') {
                return (
                  <Radio
                    data={item.data}
                    onChange={(value: string) =>
                      this.onChangeRadio(item.number || '', value)
                    }
                  ></Radio>
                );
              } else if (item.type === 'IMAGE' && item.data.src) {
                return (
                  <div>
                    <img src={item.data.src} alt="img" />
                  </div>
                );
              } else {
              }
            }
            return undefined;
          })
          .filter((i: any) => i)}
      </div>
    );
  };

  fetchData = () => {
    const renderData = [
      {
        type: 'RICHTEXT',
        data:
          '<p>You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.</p>\n',
      },
      {
        type: 'IMAGE',
        data: {
          src:
            'https://www.draft-js-plugins.com/images/canada-landscape-small.jpg',
        },
      },
      {
        type: 'RICHTEXT',
        data: '<p>See advanced examples further down …</p>\n',
      },
      {
        type: 'RADIO',
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
      {
        type: 'RICHTEXT',
        data: '<p></p>\n',
      },
      {
        type: 'RICHTEXT',
        data:
          '<p><strong>asfsfsff</strong>adsfsf<em>dsfas</em>fs<strong><ins>fasfa</ins></strong>sdfasdfasfasdfasfsadfadf</p>\n',
      },
    ];
    return renderData;
  };

  render() {
    return <div className="page-active">{this.renderData()}</div>;
  }
}

export default ReaderH5;

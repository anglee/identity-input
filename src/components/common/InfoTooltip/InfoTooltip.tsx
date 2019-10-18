import { Icon, Tooltip } from 'antd';
import * as React from 'react';
import './InfoTooltip.less';

interface IProps {
  text: string;
}
const InfoTooltip = ({ text, ...rest }: IProps) => {
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <Tooltip title={text} placement="right" {...rest}>
      <span className="InfoTooltip">
        <Icon type="info-circle-o" />
      </span>
    </Tooltip>
    /* eslint-enable react/jsx-props-no-spreading */
  );
};

export default InfoTooltip;

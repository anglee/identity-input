import { Select } from 'antd';
import React from 'react';
import { makeFormField } from '../formUtils/formUtils';

interface IProps {
  value: string;
}
const MySelect = ({ value, ...rest }: IProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Select value={value === '' ? undefined : value} {...rest} />
);
const FormDropdownSelect = makeFormField(MySelect);

export default FormDropdownSelect;

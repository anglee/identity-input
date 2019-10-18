import { DatePicker, Form } from 'antd';
import React from 'react';

interface IProps {
  input: any;
  meta: any;
  hasFeedback: boolean;
  label: string;
  required: boolean;
  placeholder: string;
}

const FormDatePicker = ({ input, meta, hasFeedback, label, required, placeholder }: IProps) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <Form.Item
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      required={required}
    >
      <DatePicker
        placeholder={placeholder || 'Select date'}
        onChange={input.onChange}
        value={input.value === '' ? null : input.value}
        onOpenChange={isOpen => {
          if (isOpen) {
            input.onFocus();
          } else {
            input.onBlur();
          }
        }}
        size="large"
      />
    </Form.Item>
  );
};

export default FormDatePicker;

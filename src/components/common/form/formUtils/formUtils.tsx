import { Form } from 'antd';
import React from 'react';
import ReactJson from 'react-json-view';

interface IProps {
  input: any;
  meta: any;
  children: React.ReactNode;
  hasFeedback: boolean;
  label: string;
  required: boolean;
  isDebugging: boolean;
  layout: any;
  description: string;
}

// eslint-disable-next-line import/prefer-default-export
export const makeFormField = (Component: any) => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  required,
  isDebugging,
  layout,
  description,
  ...rest
}: IProps) => {
  const hasError = meta.touched && meta.invalid;
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Form.Item
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      required={required}
      {...layout}
    >
      {description && <div className="form-field-description">{description}</div>}
      <Component {...input} {...rest} meta={meta}>
        {children}
      </Component>
      {isDebugging && <ReactJson name="meta" src={meta} />}
    </Form.Item>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};

import React from 'react';
import _ from 'lodash';
import { Element, scroller } from 'react-scroll';
import { Field, FormErrors, InjectedFormProps, reduxForm } from 'redux-form';
import { Alert, Button, Col, Form, Row, Spin } from 'antd';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import spinnerDelay from '../../../constants/spinnerDelay';
import FormInput from '../form/FormInput/FormInput';
import FormTextArea from '../form/FormTextArea/FormTextArea';
import IExampleData, { IExampleDataEditable } from '../../../types/IExampleData';
import './ExampleForm.less';

export const formName = 'ExampleForm';

export interface IExampleFormValues {
  name: string;
  website: string;
  description: string;
}

export const defaultValues: IExampleFormValues = {
  name: '',
  website: '',
  description: '',
};

export const toFormValues = (exampleData: IExampleData): IExampleFormValues => ({
  name: exampleData.name,
  website: exampleData.website || '',
  description: exampleData.description || '',
});

export const fromFormValues = ({
  name,
  website,
  description,
}: IExampleFormValues): IExampleDataEditable => ({
  name,
  website: _.isEmpty(website) ? undefined : website,
  description: _.isEmpty(description) ? null : description,
});

interface IProps {
  disabled?: boolean;
  submitButtonText: string;
  submissionError: string | null;
}

const ExampleForm = ({
  submitButtonText,
  submissionError,
  handleSubmit,
  submitting,
  disabled,
}: IProps & InjectedFormProps<IExampleFormValues, IProps>) => {
  return (
    <div className="ExampleForm">
      <ErrorBoundary messagePrefix="Page Error: ">
        <Form onSubmit={handleSubmit}>
          <Spin spinning={submitting} tip="Saving..." delay={spinnerDelay}>
            <Row className="form-row">
              <Col lg={24} md={24} sm={24}>
                <Element name="position-name">
                  <Field
                    label="Name"
                    name="name"
                    component={FormInput}
                    required={true}
                    placeholder="example data name"
                    autofocus={!disabled}
                    disabled={disabled}
                  />
                </Element>
              </Col>
            </Row>
            <Row className="form-row">
              <Col lg={24} md={24} sm={24}>
                <Element name="position-website">
                  <Field
                    label="Website"
                    name="website"
                    component={FormInput}
                    placeholder=""
                    disabled={disabled}
                  />
                </Element>
              </Col>
            </Row>
            <Row className="form-row">
              <Col lg={24} md={24} sm={24}>
                <Element name="position-description">
                  <Field
                    label="Description"
                    name="description"
                    component={FormTextArea}
                    rows={5}
                    disabled={disabled}
                  />
                </Element>
              </Col>
            </Row>
          </Spin>
          {submissionError && (
            <Alert
              className="ExampleForm-submit-err-banner"
              message={submissionError}
              type="error"
            />
          )}
          <Button
            disabled={disabled || submitting}
            className="submit-button"
            htmlType="submit"
            type="primary"
          >
            {submitButtonText}
          </Button>
        </Form>
      </ErrorBoundary>
    </div>
  );
};

type IErrors = FormErrors<IExampleFormValues, string>;

export const validate = (values: IExampleFormValues): IErrors => {
  const errors: IErrors = {};

  if (_.isEmpty(_.trim(values.name))) {
    errors.name = 'name is required';
  }

  return errors;
};

const scrollToFirstError = (errors: IErrors = {}) => {
  const orderedFields: (keyof IErrors)[] = ['name'];
  for (const field of orderedFields) {
    const fieldName = `position-${field}`;
    if (!_.isEmpty(errors[field]) && document.querySelectorAll(`[name="${fieldName}"]`).length) {
      scroller.scrollTo(fieldName, { smooth: true, duration: 400, delay: 100 });
      break;
    }
  }
};

export default reduxForm<IExampleFormValues, IProps>({
  form: formName,
  validate,
  touchOnChange: true,
  onSubmitFail: errors => scrollToFirstError(errors),
})(ExampleForm);

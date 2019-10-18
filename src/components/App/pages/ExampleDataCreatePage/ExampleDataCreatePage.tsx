import React, { useCallback, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import ExampleForm, {
  fromFormValues,
  IExampleFormValues,
} from '../../../common/ExampleForm/ExampleForm';
import { IExampleDataEditable } from '../../../../types/IExampleData';
import exampleDataApi from '../../../../utils/api/apiExampleData';

const ExampleDataCreatePage = ({ history }: RouteComponentProps<{}>) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const createExampleData = useCallback(async (data: IExampleDataEditable) => {
    setIsCreating(true);
    try {
      return await exampleDataApi.create(data);
    } catch (error) {
      setCreateError(error.message);
      return undefined;
    } finally {
      setIsCreating(false);
    }
  }, []);

  return (
    <section className="ExampleDataEditPage alee-page">
      <h1>Create Example Data</h1>
      <ExampleForm
        submitButtonText={isCreating ? 'Creating...' : 'Create'}
        submissionError={createError ? `Failed to create example data. ${createError}` : null}
        onSubmit={async (values: IExampleFormValues) => {
          const data = await createExampleData(fromFormValues(values));
          if (data) {
            history.push(`/exampleData/edit?id=${data.id}`);
          }
        }}
      />
    </section>
  );
};

export default withRouter(ExampleDataCreatePage);

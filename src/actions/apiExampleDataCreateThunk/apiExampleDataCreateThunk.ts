import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import actionTypes from '../actionTypes';
import { IReduxState } from '../../reducers/root';
import exampleDataApi from '../../utils/api/apiExampleData';
import IExampleData, { IExampleDataEditable } from '../../types/IExampleData';

const apiExampleDataCreateThunk = (
  data: IExampleDataEditable,
): ThunkAction<Promise<IExampleData>, IReduxState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IReduxState, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  dispatch({
    type: actionTypes.API_EXAMPLE_DATA_CREATE_REQUEST,
  });
  try {
    const exampleData: IExampleData = await exampleDataApi.create(data);
    dispatch({
      type: actionTypes.API_EXAMPLE_DATA_CREATE_SUCCESS,
      exampleData,
    });
    return exampleData;
  } catch (error) {
    console.error(`apiExampleDataCreateThunk failed`, error); // eslint-disable-line no-console
    dispatch({
      type: actionTypes.API_EXAMPLE_DATA_CREATE_FAILURE,
      error: error.message,
    });
    throw error;
  }
};

export default apiExampleDataCreateThunk;

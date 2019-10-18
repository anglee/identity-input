import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import actionTypes from '../actionTypes';
import { IReduxState } from '../../reducers/root';
import exampleDataApi from '../../utils/api/apiExampleData';
import IExampleData, { IExampleDataEditable } from '../../types/IExampleData';

const apiExampleDataUpdateThunk = (
  id: string,
  data: IExampleDataEditable,
): ThunkAction<Promise<IExampleData>, IReduxState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IReduxState, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  dispatch({
    type: actionTypes.API_EXAMPLE_DATA_UPDATE_REQUEST,
  });
  try {
    const exampleData: IExampleData = await exampleDataApi.update(id, data);
    dispatch({
      type: actionTypes.API_EXAMPLE_DATA_UPDATE_SUCCESS,
      exampleData,
    });
    return exampleData;
  } catch (error) {
    console.error(`apiExampleDataUpdateThunk failed`, error); // eslint-disable-line no-console
    dispatch({
      type: actionTypes.API_EXAMPLE_DATA_UPDATE_FAILURE,
      error: error.message,
    });
    throw error;
  }
};

export default apiExampleDataUpdateThunk;

import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import actionTypes from '../actionTypes';
import { IReduxState } from '../../reducers/root';

const initializeAppThunk = (): ThunkAction<Promise<void>, IReduxState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IReduxState, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  dispatch({
    type: actionTypes.INITIALIZE_APP_START,
  });
  try {
    dispatch({
      type: actionTypes.INITIALIZE_APP_SUCCESS,
      username: 'anglee',
    });
  } catch (error) {
    console.error(`initializeAppThunk failed`, error); // eslint-disable-line no-console
    dispatch({
      type: actionTypes.INITIALIZE_APP_FAILURE,
      error: error.message,
    });
    throw error;
  }
};

export default initializeAppThunk;

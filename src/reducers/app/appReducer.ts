import { AnyAction } from 'redux';
import actionTypes from '../../actions/actionTypes';

export interface IState {
  isInitializing: boolean;
  initializationError: string | null;
  username: string | null;
}

const initialState: IState = {
  isInitializing: false,
  initializationError: null,
  username: null,
};

const appReducer = (state: IState = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_APP_START: {
      return { ...state, isInitializing: true, initializationError: null };
    }
    case actionTypes.INITIALIZE_APP_SUCCESS: {
      return { ...state, isInitializing: false, username: action.username };
    }
    case actionTypes.INITIALIZE_APP_FAILURE: {
      return { ...state, isInitializing: false, initializationError: action.error };
    }
    default:
      return state;
  }
};

export default appReducer;

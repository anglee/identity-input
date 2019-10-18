import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import appReducer, * as fromApp from './app/appReducer';

export interface IReduxState {
  form: any;
  app: fromApp.IState;
}

export default combineReducers({
  form: formReducer,
  app: appReducer,
});

export const selectors = {
  getUsername: (state: IReduxState) => state.app.username,
};

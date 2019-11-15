import { combineReducers } from 'redux';
import userSearchResultsReducer, * as fromUserSearchResultsReducer from './userSearchResults/userSearchResultsReducer';

export interface IReduxState {
  userSearchResults: fromUserSearchResultsReducer.IState;
}

export default combineReducers({
  userSearchResults: userSearchResultsReducer,
});

export const selectors = {
  getUserSearchResults: (state: IReduxState) =>
    fromUserSearchResultsReducer.getSearchResults(state.userSearchResults),

  getUserSearchResultsIsPending: (state: IReduxState) =>
    fromUserSearchResultsReducer.getIsPending(state.userSearchResults),

  getUserSearchResultsError: (state: IReduxState) =>
    fromUserSearchResultsReducer.getError(state.userSearchResults),
};

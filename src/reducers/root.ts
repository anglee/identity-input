import { combineReducers } from 'redux';
import userSearchResultsReducer, * as fromUserSearchResultsReducer from './userSearchResults/userSearchResultsReducer';

export interface IReduxState {
  userSearchResults: fromUserSearchResultsReducer.IState;
}

export default combineReducers({
  userSearchResults: userSearchResultsReducer,
});

export const selectors = {
  getUserSearchResults: (query: string) => (state: IReduxState) =>
    fromUserSearchResultsReducer.getSearchResults(state.userSearchResults, query),

  getUserSearchResultsIsPending: (query: string) => (state: IReduxState) =>
    fromUserSearchResultsReducer.getIsPending(state.userSearchResults, query),

  getUserSearchResultsError: (query: string) => (state: IReduxState) =>
    fromUserSearchResultsReducer.getError(state.userSearchResults, query),
};

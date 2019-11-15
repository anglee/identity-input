import _ from 'lodash';
import { combineReducers } from 'redux';
import resultsLoginCacheReducer, * as fromResultsLoginCache from './resultsLoginCache/resultsLoginCacheReducer';
import usersReducer, * as fromUsers from './users/usersReducer';

export interface IState {
  resultsLoginCache: fromResultsLoginCache.IState;
  users: fromUsers.IState;
}

export default combineReducers({
  resultsLoginCache: resultsLoginCacheReducer,
  users: usersReducer,
});

export const getSearchResults = (state: IState, query: string) => {
  const logins = fromResultsLoginCache.getSearchResultLogins(state.resultsLoginCache, query);
  if (!logins) {
    return undefined;
  }
  return _.map(logins, login => fromUsers.getUser(state.users, login));
};
export const getIsPending = (state: IState, query: string) => {
  return fromResultsLoginCache.getIsPending(state.resultsLoginCache, query);
};
export const getError = (state: IState, query: string) => {
  return fromResultsLoginCache.getError(state.resultsLoginCache, query);
};

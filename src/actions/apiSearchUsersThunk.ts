import _ from 'lodash';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { User } from '../types';
// import apiUserSearch from '../mockApi/api';
import apiUserSearch from '../githubApi/api';
import { IReduxState } from '../reducers/root';

const apiSearchUsersThunk = (
  query: string,
): ThunkAction<Promise<User[]>, IReduxState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  const requestId = _.uniqueId('apiSearchUsers_');
  dispatch({ type: 'SEARCH_USERS_API_REQUEST', query, requestId });
  try {
    const searchResults: User[] = await apiUserSearch.search(query);
    dispatch({ type: 'SEARCH_USERS_API_SUCCESS', query, requestId, searchResults });
    return searchResults;
  } catch (error) {
    dispatch({ type: 'SEARCH_USERS_API_FAILURE', query, requestId, error: error.message });
    throw error;
  }
};

export default apiSearchUsersThunk;

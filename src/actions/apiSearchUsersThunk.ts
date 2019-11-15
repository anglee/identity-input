import _ from 'lodash';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { User } from '../types';
// import apiUserSearch from '../mockApi/api';
import apiUserSearch from '../githubApi/api';
import { IReduxState } from '../reducers/root';

const apiSearchUsersThunk = (
  query: string,
  pageCount: number,
): ThunkAction<Promise<User[]>, IReduxState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  const requestId = _.uniqueId('apiSearchUsers_');
  dispatch({ type: 'SEARCH_USERS_API_REQUEST', query, pageCount, requestId });
  try {
    const fetchedPages = await Promise.all(
      _.range(1, pageCount + 1).map(page => {
        return apiUserSearch.search(query, page);
      }),
    );
    const searchResults = _.flatten(fetchedPages);
    dispatch({ type: 'SEARCH_USERS_API_SUCCESS', query, pageCount, requestId, searchResults });
    return searchResults;
  } catch (error) {
    dispatch({
      type: 'SEARCH_USERS_API_FAILURE',
      query,
      pageCount,
      requestId,
      error: error.message,
    });
    throw error;
  }
};

export default apiSearchUsersThunk;

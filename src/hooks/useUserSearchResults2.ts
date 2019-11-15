import { useEffect, useReducer } from 'react';
import _ from 'lodash';
import { AnyAction } from 'redux';
import { User } from '../types';
import useReducerLogger from '../utils/useReducerLogger';
// import apiUserSearch from '../mockApi/api';
import apiUserSearch from '../githubApi/api';

export interface IState {
  searchResults: User[];
  isFetching: boolean;
  fetchingError: string | null;
}

const initialState: IState = {
  searchResults: [],
  isFetching: false,
  fetchingError: null,
};

const reducer = (state: IState, action: AnyAction) => {
  switch (action.type) {
    case 'SEARCH_USERS_API_REQUEST': {
      return { ...state, isFetching: true, searchResults: [], fetchingError: null };
    }
    case 'SEARCH_USERS_API_SUCCESS': {
      return { ...state, isFetching: false, searchResults: action.searchResults };
    }
    case 'SEARCH_USERS_API_FAILURE': {
      return { ...state, isFetching: false, fetchingError: action.error };
    }
    default:
      return state;
  }
};

const selectors = {
  getIsFetching: (state: IState) => state.isFetching,
  getFetchingError: (state: IState) => state.fetchingError,
  getSearchResults: (state: IState) => state.searchResults,
};

interface Response {
  searchResults: User[];
  isPending: boolean;
  error: string | null;
}
const useUserSearchResults = (query: string): Response => {
  const [state, dispatch] = useReducer(useReducerLogger(reducer), initialState);

  useEffect(() => {
    const doSearch = async (q: string): Promise<void> => {
      dispatch({ type: 'SEARCH_USERS_API_REQUEST', q });
      try {
        const searchResults: User[] = await apiUserSearch.search(q);
        dispatch({ type: 'SEARCH_USERS_API_SUCCESS', q, searchResults });
      } catch (error) {
        dispatch({ type: 'SEARCH_USERS_API_FAILURE', q, error: error.message });
      }
    };

    if (!_.isEmpty(query)) {
      doSearch(query).then(_.noop);
    }
  }, [query]);

  return {
    searchResults: selectors.getSearchResults(state),
    isPending: selectors.getIsFetching(state),
    error: selectors.getFetchingError(state),
  };
};

export default useUserSearchResults;

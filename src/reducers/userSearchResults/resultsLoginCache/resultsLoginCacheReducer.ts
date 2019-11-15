import _ from 'lodash';
import { AnyAction, Reducer } from 'redux';

export interface ISearchState {
  searchResultLogins: string[];
  fetchRequestId: string | null;
  fetchError: string | null;
}

export interface IState {
  [query: string]: ISearchState;
}

const initialState: IState = {};

const reducer: Reducer = (state: IState = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SEARCH_USERS_API_REQUEST': {
      return {
        ...state,
        [action.query]: {
          searchResultLogins: [],
          fetchRequestId: action.requestId,
          fetchError: null,
        },
      };
    }
    case 'SEARCH_USERS_API_SUCCESS': {
      if (action.requestId === state[action.query].fetchRequestId) {
        return {
          ...state,
          [action.query]: {
            searchResultLogins: _.map(action.searchResults, 'username'),
            fetchRequestId: null,
            fetchError: null,
          },
        };
      }
      return state;
    }
    case 'SEARCH_USERS_API_FAILURE': {
      if (action.fetchRequestId === state[action.query].fetchRequestId) {
        return {
          ...state,
          [action.query]: {
            fetchRequestId: null,
            fetchError: action.error,
          },
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;

export const getSearchResultLogins = (state: IState, query: string) =>
  state[query] ? state[query].searchResultLogins : undefined;
export const getIsPending = (state: IState, query: string) =>
  state[query] && state[query].fetchRequestId !== null;
export const getError = (state: IState, query: string) =>
  state[query] ? state[query].fetchError : null;

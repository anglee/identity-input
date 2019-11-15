import { AnyAction, Reducer } from 'redux';
import { User } from '../../types';

export interface IState {
  searchResults: User[];
  fetchRequestId: string | null;
  fetchError: string | null;
}

const initialState: IState = {
  searchResults: [],
  fetchRequestId: null,
  fetchError: null,
};

const reducer: Reducer = (state: IState = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SEARCH_USER_API_REQUEST': {
      return {
        fetchRequestId: action.requestId,
        searchResults: [],
        fetchError: null,
      };
    }
    case 'SEARCH_USER_API_SUCCESS': {
      if (action.fetchRequestId === state.fetchRequestId) {
        return {
          ...state,
          fetchRequestId: null,
          searchResults: action.searchResults,
        };
      }
      return state;
    }
    case 'SEARCH_USER_API_FAILURE': {
      if (action.fetchRequestId === state.fetchRequestId) {
        return {
          ...state,
          fetchRequestId: null,
          fetchError: action.error,
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

export const getSearchResults = (state: IState) => state.searchResults;
export const getIsPending = (state: IState) => state.fetchRequestId !== null;
export const getError = (state: IState) => state.fetchError;

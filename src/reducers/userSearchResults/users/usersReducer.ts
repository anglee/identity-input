import { AnyAction, Reducer } from 'redux';
import { User } from '../../../types';

export interface IState {
  [login: string]: User;
}

const initialState: IState = {};

const reducer: Reducer = (state: IState = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SEARCH_USERS_API_SUCCESS': {
      const newState = { ...state };
      for (const searchResult of action.searchResults) {
        newState[searchResult.username] = searchResult;
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;

export const getUser = (state: IState, login: string) => state[login];

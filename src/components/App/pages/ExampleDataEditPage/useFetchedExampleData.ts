import { useEffect, useReducer } from 'react';
import _ from 'lodash';
import { AnyAction } from 'redux';
import IExampleData from '../../../../types/IExampleData';
import exampleDataApi from '../../../../utils/api/apiExampleData';
import useReducerLogger from '../../../../utils/useReducerLogger';

const actionTypes = {
  API_EXAMPLE_DATA_FETCH_REQUEST: 'API_EXAMPLE_DATA_FETCH_REQUEST',
  API_EXAMPLE_DATA_FETCH_SUCCESS: 'API_EXAMPLE_DATA_FETCH_SUCCESS',
  API_EXAMPLE_DATA_FETCH_FAILURE: 'API_EXAMPLE_DATA_FETCH_FAILURE',
};

export interface IState {
  exampleData: IExampleData | null;
  isFetching: boolean;
  fetchingError: string | null;
}

const initialState: IState = {
  exampleData: null,
  isFetching: false,
  fetchingError: null,
};

const reducer = (state: IState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.API_EXAMPLE_DATA_FETCH_REQUEST: {
      return { ...state, isFetching: true, exampleData: null, fetchingError: null };
    }
    case actionTypes.API_EXAMPLE_DATA_FETCH_SUCCESS: {
      return { ...state, isFetching: false, exampleData: action.exampleData };
    }
    case actionTypes.API_EXAMPLE_DATA_FETCH_FAILURE: {
      return { ...state, isFetching: false, fetchingError: action.error };
    }
    default:
      return state;
  }
};

const selectors = {
  getIsFetching: (state: IState) => state.isFetching,
  getFetchingError: (state: IState) => state.fetchingError,
  getExampleData: (state: IState) => state.exampleData,
};

const useFetchedExampleData = (
  exampleDataId: string,
): { isFetching: boolean; fetchError: string | null; fetchedExampleData: IExampleData | null } => {
  const [state, dispatch] = useReducer(useReducerLogger(reducer), initialState);

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async (id: string): Promise<void> => {
      dispatch({ type: actionTypes.API_EXAMPLE_DATA_FETCH_REQUEST, id });
      try {
        const exampleData: IExampleData = await exampleDataApi.fetch(id);
        if (!isCancelled) {
          dispatch({ type: actionTypes.API_EXAMPLE_DATA_FETCH_SUCCESS, id, exampleData });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`apiExampleDataFetchThunk(id=${exampleDataId}) failed`, error);
        if (!isCancelled) {
          dispatch({ type: actionTypes.API_EXAMPLE_DATA_FETCH_FAILURE, id, error: error.message });
        }
      }
    };

    fetchData(exampleDataId).then(_.noop);

    return () => {
      isCancelled = true;
    };
  }, [exampleDataId]);

  return {
    isFetching: selectors.getIsFetching(state),
    fetchError: selectors.getFetchingError(state),
    fetchedExampleData: selectors.getExampleData(state),
  };
};

export default useFetchedExampleData;

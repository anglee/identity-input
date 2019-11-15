import { useEffect } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../types';
import { selectors } from '../reducers/root';
import apiSearchUsersThunk from '../actions/apiSearchUsersThunk';

interface Response {
  searchResults: User[];
  isPending: boolean;
  error: string | null;
}
const useUserSearchResults = (query: string): Response => {
  const searchResults = useSelector(selectors.getUserSearchResults(query));
  const isPending = useSelector(selectors.getUserSearchResultsIsPending(query));
  const error = useSelector(selectors.getUserSearchResultsError(query));

  const dispatch = useDispatch();
  useEffect(() => {
    const doSearch = async (q: string): Promise<void> => {
      await dispatch(apiSearchUsersThunk(q));
    };

    if (!_.isEmpty(query) && searchResults === undefined && !isPending) {
      doSearch(query).then(_.noop);
    }
  }, [query, dispatch, isPending, searchResults]);

  return {
    searchResults: searchResults || [],
    isPending,
    error,
  };
};

export default useUserSearchResults;

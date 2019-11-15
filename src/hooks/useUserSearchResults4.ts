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
  const searchResults = useSelector(selectors.getUserSearchResults);
  const isPending = useSelector(selectors.getUserSearchResultsIsPending);
  const error = useSelector(selectors.getUserSearchResultsError);

  const dispatch = useDispatch();
  useEffect(() => {
    const doSearch = async (q: string): Promise<void> => {
      await dispatch(apiSearchUsersThunk(q));
    };

    if (!_.isEmpty(query)) {
      doSearch(query).then(_.noop);
    }
  }, [query, dispatch]);

  return {
    searchResults,
    isPending,
    error,
  };
};

export default useUserSearchResults;

import { useEffect, useState } from 'react';
import { User } from '../types';
// import apiUserSearch from '../mockApi/api';
import apiUserSearch from '../githubApi/api';

interface Response {
  searchResults: User[];
  isPending: boolean;
}
const useUserSearchResults = (query: string): Response => {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setSearchResults(await apiUserSearch.search(query));
      setIsPending(false);
    };
    fetchData();
  }, [query]);

  return {
    searchResults,
    isPending,
  };
};

export default useUserSearchResults;

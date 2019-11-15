import _ from 'lodash';
import { User } from '../types';

const apiUserSearch = {
  search: async (searchString: string, page = 0): Promise<User[]> => {
    if (_.isEmpty(searchString)) {
      return [];
    }
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchString}&page=${page}`,
    );
    // const response = await fetch(`https://api.github.com/users/zpao`);
    if (response.status !== 200) {
      throw new Error(`GitHub API returned Error ${response.status}`);
    }
    const res = (await response.json()) as any;
    // console.log('res', res);
    const { items } = res;
    return _.map(items, item => ({
      name: item.login,
      username: item.login,
      email: item.html_url,
      avatarUrl: item.avatar_url,
    }));
  },
};

export default apiUserSearch;

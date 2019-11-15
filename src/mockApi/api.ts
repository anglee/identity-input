import _ from 'lodash';
import { users } from './data';
import { User } from '../types';

const delay = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

const apiUserSearch = {
  search: async (searchString: string): Promise<User[]> => {
    await delay(_.random(100, 500));
    const results = _.filter(users, user => {
      return (
        _.includes(_.toLower(user.name), _.toLower(searchString)) ||
        _.includes(_.toLower(user.username), _.toLower(searchString)) ||
        _.includes(_.toLower(user.email), _.toLower(searchString))
      );
    });
    return results;
  },
};

export default apiUserSearch;

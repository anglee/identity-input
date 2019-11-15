import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import { Select, Spin } from 'antd';
import useUserSearchResults from '../hooks/useUserSearchResults';
import { User } from '../types';

const DEBOUNCE = 300;

interface Props {
  value: User[];
  onChange: (newValue: User[]) => void;
}

const UserSearchMultiSelect = ({ value: users, onChange }: Props) => {
  const [searchString, setSearchString] = useState<string>('');
  const { searchResults, isPending } = useUserSearchResults(searchString);
  const handleSearch = useCallback(
    _.debounce((s: string) => {
      setSearchString(s);
    }, DEBOUNCE),
    [],
  );

  return (
    <div>
      <Select
        mode="multiple"
        style={{ minWidth: 270 }}
        value={_.map(users, 'username')}
        placeholder="Search and Select users"
        filterOption={false}
        onSearch={handleSearch}
        onChange={(newUsernames: string[]) => {
          onChange(
            _.map(newUsernames, username => {
              return (
                (_.find(searchResults, { username }) as User) ||
                (_.find(users, { username }) as User)
              );
            }),
          );
        }}
        notFoundContent={isPending ? <Spin size="small" /> : null}
      >
        {_.map(searchResults, user => (
          <Select.Option key={user.username} value={user.username}>
            <img alt="avatar" src={user.avatarUrl} height="20" width="20" />
            <span style={{ display: 'inline-block', marginLeft: 8 }}>{user.name}</span>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default UserSearchMultiSelect;

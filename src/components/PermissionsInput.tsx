import React from 'react';
import { Card } from 'antd';
import _ from 'lodash';
import UserSearchMultiSelect from './UserSearchMultiSelect';
import { Permission, PermissionLevel } from '../types';

interface Props {
  value: Permission[];
  onChange: (permissions: Permission[]) => void;
}

const PermissionsInput = ({ value: permissions, onChange }: Props) => {
  return (
    <Card className="PermissionsInput">
      {_.map(
        [PermissionLevel.owner, PermissionLevel.editor, PermissionLevel.viewer],
        (permissionLevel: PermissionLevel) => (
          <section key={permissionLevel} style={{ marginTop: 16 }}>
            <h3>{_.upperFirst(permissionLevel)}s</h3>
            <UserSearchMultiSelect
              value={_.chain(permissions)
                .filter({ permissionLevel })
                .map('user')
                .value()}
              onChange={users => {
                onChange([
                  ..._.reject(permissions, { permissionLevel }),
                  ..._.map(users, user => ({ user, permissionLevel })),
                ]);
              }}
            />
          </section>
        ),
      )}
    </Card>
  );
};

export default PermissionsInput;

/* eslint-disable import/prefer-default-export */

export interface User {
  username: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export enum PermissionLevel {
  owner = 'owner',
  editor = 'editor',
  viewer = 'viewer',
}

export interface Permission {
  user: User;
  permissionLevel: PermissionLevel;
}

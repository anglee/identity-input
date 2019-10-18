import React from 'react';
import './AppHeader.less';

interface IProps {
  username: string | null;
}

const AppHeader = ({ username }: IProps) => {
  return (
    <div className="AppHeader">
      <div className="AppHeader-app-name">Redux-form-starter</div>
      <div className="AppHeader-username">
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
          {username}
        </a>
      </div>
    </div>
  );
};

export default AppHeader;

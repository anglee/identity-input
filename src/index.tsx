import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import 'antd/dist/antd.css';
import { render } from 'react-dom';
import PermissionsInput from './components/PermissionsInput';
import { Permission } from './types';

import './index.css';

function App() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  return (
    <div className="App">
      <PermissionsInput value={permissions} onChange={setPermissions} />
      <div className="debug-results">
        <ReactJson src={permissions} name="permissions" />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);

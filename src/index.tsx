import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import store from './store';
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
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);

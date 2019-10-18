import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Layout } from 'antd';
import { selectors } from '../../reducers/root';
import actionCreators from '../../actions/actionCreators';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ExampleFormEditPage from './pages/ExampleDataEditPage/ExampleDataEditPage';
import ExampleFormCreatePage from './pages/ExampleDataCreatePage/ExampleDataCreatePage';
import AppHeader from './AppHeader/AppHeader';
import './App.less';

const App: React.FC<{}> = (): JSX.Element => {
  const username = useSelector(selectors.getUsername);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actionCreators.initializeApp());
  }, [dispatch]);

  return (
    <div className="App">
      <Layout>
        <Layout.Header className="App-header">
          <AppHeader username={username} />
        </Layout.Header>
        <Layout.Content className="App-content">
          <HashRouter>
            <div>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/exampleData/edit?id=existing123" />}
                />
                <Route exact path="/exampleData/create" component={ExampleFormCreatePage} />
                <Route exact path="/exampleData/edit" component={ExampleFormEditPage} />
                <Route path="/404" component={NotFoundPage} />
                <Redirect to="/404" />
              </Switch>
            </div>
          </HashRouter>
        </Layout.Content>
        <Layout.Footer className="App-footer">
          Copyright <Icon type="copyright" /> 2019 Ang Lee
        </Layout.Footer>
      </Layout>
    </div>
  );
};

export default App;

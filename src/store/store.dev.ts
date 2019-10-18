import _ from 'lodash';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers/root';

const composeEnhancers = composeWithDevTools({});
const middlewares = [
  thunk,
  createLogger({
    collapsed: true,
    predicate: (getState, action) => {
      return !_.startsWith(action.type, '@@redux-form/');
    },
  }),
];

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export default createStore(reducers, enhancer);

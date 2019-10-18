import initializeAppThunk from './initializeAppThunk/initializeAppThunk';
import apiExampleDataCreateThunk from './apiExampleDataCreateThunk/apiExampleDataCreateThunk';
import apiExampleDataUpdateThunk from './apiExampleDataUpdateThunk/apiExampleDataUpdateThunk';

const actionCreators = {
  initializeApp: initializeAppThunk,
  apiCreateExampleData: apiExampleDataCreateThunk,
  apiUpdateExampleData: apiExampleDataUpdateThunk,
};

export default actionCreators;

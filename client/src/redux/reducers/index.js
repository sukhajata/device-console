import { combineReducers } from 'redux';

import connectionReducer from '../slices/connectionSlice';
import functionReducer from '../slices/functionSlice';
import authReducer from '../slices/authSlice';
import configReducer from '../slices/configSlice';
import dataReducer from '../slices/dataSlice';
import mapReducer from '../slices/mapSlice';
import filterReducer from '../slices/filterSlice';

export default combineReducers({
  connection: connectionReducer,
  auth: authReducer,
  function: functionReducer,
  config: configReducer,
  data: dataReducer,
  map: mapReducer,
  filter: filterReducer,
});
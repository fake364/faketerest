import { combineReducers } from 'redux';
import metadataReducer from './metadata';
import userDataReducer from './user-data/user-data';

const rootReducer = combineReducers({
  metadata: metadataReducer,
  userData: userDataReducer
});

export default rootReducer;

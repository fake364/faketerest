import { combineReducers } from 'redux';
import metadataReducer from './metadata';

const rootReducer = combineReducers({ metadata: metadataReducer });

export default rootReducer;

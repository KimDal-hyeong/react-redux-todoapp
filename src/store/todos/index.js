import { combineReducers } from 'redux-immutable';

import byId from './byId';
import ids from './ids';
import isChanging from './isChanging';

export default combineReducers({
  byId,
  ids,
  isChanging,
});
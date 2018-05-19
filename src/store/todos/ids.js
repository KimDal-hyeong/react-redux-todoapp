import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import * as TYPES from '../actionTypes';

const todoIdsReducer = handleActions(
  {
    [TYPES.TODO_FETCH_LIST_SUCCESS]: (state, action) => {
      const data = action.payload;
      return Immutable.List(
        data.map((todo) => todo.id)
      );
    },
  },
  Immutable.List(),
);

export default todoIdsReducer;
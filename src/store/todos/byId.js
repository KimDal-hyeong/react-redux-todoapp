import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import * as TYPES from '../actionTypes';

const byIdReducer = handleActions(
  {
    [TYPES.TODO_FETCH_LIST_SUCCESS]: (state, action) => {
      const data = action.payload;
      let todos = Immutable.Map();
      data.forEach(todo => {
        todos = todos.set(todo.id, Immutable.Map({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
        }));
      });
      // id 순으로 정렬
      return todos.sort((a, b) => {
        const aId = a.get('id');
        const bId = b.get('id');
        if (aId < bId) { return 1; }
        if (aId > bId) { return -1; }
        return 0;
      });
    },
  },
  Immutable.Map(),
);

export default byIdReducer;
import { combineActions, handleActions } from 'redux-actions';

import * as TYPES from '../actionTypes';

export default handleActions(
  {
    [combineActions(
      TYPES.TODO_ADD_REQUEST,
      TYPES.TODO_TOGGLE_COMPLETED_REQUEST,
      TYPES.TODO_DELETE_REQUEST,
      TYPES.TODO_EDIT_TITLE_REQUEST,
    )]: () => true,
    [combineActions(
      TYPES.TODO_ADD_SUCCESS,
      TYPES.TODO_ADD_FAILURE,
      TYPES.TODO_TOGGLE_COMPLETED_SUCCESS,
      TYPES.TODO_TOGGLE_COMPLETED_FAILURE,
      TYPES.TODO_DELETE_SUCCESS,
      TYPES.TODO_DELETE_FAILURE,
      TYPES.TODO_EDIT_TITLE_SUCCESS,
      TYPES.TODO_EDIT_TITLE_FAILURE,
    )]: () => false,
  }, false);
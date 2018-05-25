import axios from 'axios';
import { createAction } from 'redux-actions';

import * as TYPES from './actionTypes';
import {byIdSelector} from "../store/selectors";

// todo 불러오기
export const fetchTodoListRequest = createAction(TYPES.TODO_FETCH_LIST_REQUEST);
export const fetchTodoListSuccess = createAction(TYPES.TODO_FETCH_LIST_SUCCESS);
export const fetchTodoListFailure = createAction(TYPES.TODO_FETCH_LIST_FAILURE);

export const fetchTodoList = filter => dispatch => {
  dispatch(fetchTodoListRequest());
  axios({
      url: '/todos',
      baseURL: 'http://192.168.0.17:4000',
      params: {filter}
    })
    .then(response => {
      dispatch(fetchTodoListSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchTodoListFailure(error));
    })
};

// todo 추가하기
export const addTodo = createAction(TYPES.TODO_ADD_REQUEST);
export const addTodoSuccess = createAction(TYPES.TODO_ADD_SUCCESS);
export const addTodoFailure = createAction(TYPES.TODO_ADD_FAILURE);

// todo 삭제하기
export const deleteTodoRequest = createAction(TYPES.TODO_DELETE_REQUEST);
export const deleteTodoSuccess = createAction(TYPES.TODO_DELETE_SUCCESS);
export const deleteTodoFailure = createAction(TYPES.TODO_DELETE_FAILURE);

export const deleteTodo = id => dispatch => {
  dispatch(deleteTodoRequest());
  axios({
    url: `/todos/${id}`,
    method: 'DELETE',
    baseURL: 'http://192.168.0.17:4000',
  })
    .then(response => {
      dispatch(deleteTodoSuccess(response.data));
    })
    .catch(error => {
      dispatch(deleteTodoFailure(error));
    })
};

// todo completed 변경하기
export const toggleTodoCompletedRequest = createAction(TYPES.TODO_TOGGLE_COMPLETED_REQUEST);
export const toggleTodoCompletedSuccess = createAction(TYPES.TODO_TOGGLE_COMPLETED_SUCCESS);
export const toggleTodoCompletedFailure = createAction(TYPES.TODO_TOGGLE_COMPLETED_FAILURE);

export const toggleTodoCompleted = (id, completed) => dispatch => {
  dispatch(toggleTodoCompletedRequest());
  axios({
    url: `/todos/${id}/completed`,
    method: 'PUT',
    baseURL: 'http://192.168.0.17:4000',
    header: {'Content-Type': 'application/json'},
    data: {completed}
  })
    .then(response => {
      dispatch(toggleTodoCompletedSuccess());
    })
    .catch(error => {
      dispatch(toggleTodoCompletedFailure(error));
    })
};

// todo title 수정하기
export const editTodoTitleRequest = createAction(TYPES.TODO_EDIT_TITLE_REQUEST);
export const editTodoTitleSuccess = createAction(TYPES.TODO_EDIT_TITLE_SUCCESS);
export const editTodoTitleFailure = createAction(TYPES.TODO_EDIT_TITLE_FAILURE);

export const editTodoTitle = (id, title) => dispatch => {
  dispatch(editTodoTitleRequest());
  axios({
    url: `/todos/${id}/title`,
    method: 'PUT',
    baseURL: 'http://192.168.0.17:4000',
    header: {'Content-Type': 'application/json'},
    data: {title}
  })
    .then(response => {
      dispatch(editTodoTitleSuccess());
    })
    .catch(error => {
      dispatch(editTodoTitleFailure(error));
    })
};

// 모든 todo completed 변경하기
export const toggleAllTodoCompleted = () => (dispatch, getState) => {
  const todos = byIdSelector(getState());
  let isCompleteAllTodos = true;
  todos.forEach(todo => {
    if(todo.get('completed') === false) {
      isCompleteAllTodos = false;
      return false;
    }
  });
  todos.forEach(todo => {
    dispatch(toggleTodoCompleted(todo.get('id'), !isCompleteAllTodos));
  });
};

// 완료된 todo 모두 삭제하기
export const deleteCompletedTodo = () => (dispatch, getState) => {
  const todos = byIdSelector(getState());
  todos.forEach(todo => {
    if(todo.get('completed') === true) {
      dispatch(deleteTodo(todo.get('id')));
    }
  });
};
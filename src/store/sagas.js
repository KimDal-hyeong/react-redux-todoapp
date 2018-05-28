import { all, call, fork, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import * as TYPES from './actionTypes';
import * as actions from './actions';

export function* addTodo({ payload }) {
  const title = payload;

  const option = {
    url: '/todos',
    method: 'POST',
    baseURL: 'http://192.168.0.17:4000',
    header: {'Content-Type': 'application/json'},
    data: {title}
  };

  try {
    const data = yield call(axios, option);
    yield put(actions.addTodoSuccess(data));
  } catch (error) {
    yield put(actions.addTodoFailure(error));
  }
}

export function* deleteTodo({ payload }) {
  const id = payload;

  const option = {
    url: `/todos/${id}`,
    method: 'DELETE',
    baseURL: 'http://192.168.0.17:4000',
  };

  try {
    const data = yield call(axios, option);
    yield put(actions.deleteTodoSuccess(data));
  } catch (error) {
    yield put(actions.deleteTodoFailure(error));
  }
}

export function* watchAddTodo() {
  yield takeEvery(TYPES.TODO_ADD_REQUEST, addTodo);
}

export function* watchDeleteTodo() {
  yield takeEvery(TYPES.TODO_DELETE_REQUEST, deleteTodo);
}

export default function* sagas() {
  yield all([
    fork(watchAddTodo),
    fork(watchDeleteTodo),
  ]);
}
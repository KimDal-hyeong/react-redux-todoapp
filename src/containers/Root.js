import React from 'react';
import { Provider, connect } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import {ALL, ACTIVE, COMPLETED} from '../constants/visibilityFilter';
import store from '../store/store';
import {byIdSelector, isChangingSelector} from "../store/selectors";
import TodoApp from '../components/TodoApp';
import {
  addTodo,
  deleteCompletedTodo,
  deleteTodo,
  editTodoTitle,
  fetchTodoList,
  toggleAllTodoCompleted,
  toggleTodoCompleted,
} from '../store/actions';

const mapStateToProps = state => {
  return {
    todos: byIdSelector(state).toList().toJS(),
    isChanging: isChangingSelector(state),
  }
};

const mapDispatchToProps = {
  onChangeAllChecker: toggleAllTodoCompleted,
  onChangeCheck: toggleTodoCompleted,
  onClearCompleted: deleteCompletedTodo,
  onClickDestroy: deleteTodo,
  onEditTitle: editTodoTitle,
  onFetchTodoList: fetchTodoList,
  onSubmitTodo: addTodo,
};

const TodoAppContainer = connect(mapStateToProps, mapDispatchToProps)(TodoApp);

const routes = {
  path: '/',
  indexRoute: {
    onEnter: (location, replace) => replace('/all'),
  },
  childRoutes: [
    {
      path: 'all',
      components: () => <TodoAppContainer filter={ALL} />,
    },
    {
      path: 'active',
      components: () => <TodoAppContainer filter={ACTIVE} />,
    },
    {
      path: 'completed',
      components: () => <TodoAppContainer filter={COMPLETED} />,
    },
  ]
};

function Root() {
  return (
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>
  )
}

export default Root;

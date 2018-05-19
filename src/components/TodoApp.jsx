import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import {ALL, ACTIVE, COMPLETED} from "../constants/visibilityFilter";

import TextForm from './TextForm';
import CheckList from './CheckList';

const propTypes = {
  isChanging: PropTypes.bool,
  onChangeAllChecker: PropTypes.func,
  onChangeCheck: PropTypes.func,
  onClearCompleted: PropTypes.func,
  onClickDestroy: PropTypes.func,
  onEditTitle: PropTypes.func,
  onSubmitTodo: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      title: PropTypes.string,
      checked: PropTypes.bool,
    })),
};

const defaultProps = {
  isChanging: false,
  onChangeAllChecker() {},
  onChangeCheck() {},
  onClearCompleted() {},
  onClickDestroy() {},
  onEditTitle() {},
  onSubmitTodo() {},
  todos: [],
};

class TodosApp extends React.Component {
  componentDidMount() {
    this.props.onFetchTodoList(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.filter !== nextProps.filter){
      this.props.onFetchTodoList(nextProps.filter);
    } else if (this.props.isChanging === true && nextProps.isChanging === false) {
      this.props.onFetchTodoList(nextProps.filter);
    }
  }

  render(){
    const {
      onChangeAllChecker,
      onChangeCheck,
      onClearCompleted,
      onClickDestroy,
      onEditTitle,
      onSubmitTodo,
      todos,
    } = this.props;

    const CheckListItem = todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      checked: todo.completed,
    }));

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TextForm
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onSubmit={onSubmitTodo}
          />
        </header>
        <CheckList
          items={CheckListItem}
          onChangeAllChecker={onChangeAllChecker}
          onChangeCheck={onChangeCheck}
          onClickDestroy={onClickDestroy}
          onEditTitle={onEditTitle}
        />
        <footer className="footer">
          <span className="todo-count"><strong>8</strong> items left</span>
          <ul className="filters">
            <li>
              <Link to="/all" activeClassName="selected">{ALL}</Link>
            </li>
            <li>
              <Link to="/active" activeClassName="selected">{ACTIVE}</Link>
            </li>
            <li>
              <Link to="/completed" activeClassName="selected">{COMPLETED}</Link>
            </li>
          </ul>
          <button
            className="clear-completed"
            onClick={onClearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

TodosApp.propTypes = propTypes;
TodosApp.defaultProps = defaultProps;

export default TodosApp;
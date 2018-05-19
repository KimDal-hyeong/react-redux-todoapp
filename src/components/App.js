import React from 'react';
import { Link } from 'react-router';

import {ALL, ACTIVE, COMPLETED} from "../constants/visibilityFilter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputKeypress = this.handleInputKeypress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.filter !== nextProps.filter){
      this.props.onFetchTodoList(nextProps.filter);
    } else if (this.props.isAdding === true && nextProps.isAdding === false) {
      this.props.onFetchTodoList(nextProps.filter);
    }
  }

  componentDidMount() {
    this.props.onFetchTodoList(this.props.filter);
  }

  handleChangeCheck (id, e) {
    this.props.onChangeCheck({
      id: id,
      value: e.target.checked,
    });
  };

  handleInputKeypress (e) {
    if(e.key === 'Enter'){
      this.props.onSubmitTodo(this.input.value);
      this.input.value = '';
    }
  }

  render(){
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            ref={ref => this.input = ref}
            type="text"
            autoFocus
            onKeyPress={this.handleInputKeypress}
          />
        </header>
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {this.props.todos ? this.props.todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => {this.handleChangeCheck(todo.id, e)}}
                  />
                  <label>{todo.title}</label>
                  <button
                    type="button"
                    className="destroy"
                    onClick={() => {this.props.onClickDestroy(todo.id)}}
                  />
                </div>
              </li>
            )) : ''}
          </ul>

        </section>
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
          <button className="clear-completed">Clear completed</button>
        </footer>

      </section>
    )
  }
}

export default App;
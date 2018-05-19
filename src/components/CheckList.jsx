import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

const propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      checked: PropTypes.bool,
    })),
  loadingNode: PropTypes.node,
  onChangeAllChecker: PropTypes.func,
  onChangeCheck: PropTypes.func,
  onClickDestroy: PropTypes.func,
  onEditTitle: PropTypes.func,
};

const defaultProps = {
  isLoading: false,
  items: [],
  loadingNode: null,
  onChangeAllChecker() {},
  onChangeCheck() {},
  onClickDestroy() {},
  onEditTitle() {},
};

function CheckList(props) {

  const {
    isLoading,
    items,
    loadingNode,
    onChangeAllChecker,
    onChangeCheck,
    onClickDestroy,
    onEditTitle,
  } = props;

  return (
    <section className="main">
      <input
        className="toggle-all"
        type="checkbox"
      />
      <label
        htmlFor="toggle-all"
        onClick={onChangeAllChecker}
      >Mark all as complete</label>
      <ul className="todo-list">
        {items ? items.map(({id, title, checked}) => (
          <ListItem
            key={id}
            id={id}
            checked={checked}
            onChangeCheck={checked => {onChangeCheck(id, checked)}}
            onClickDestroy={() => {onClickDestroy(id)}}
            onEditTitle={title => {onEditTitle(id, title)}}
          >
            {title}
          </ListItem>
        )) : ''}
      </ul>
      {isLoading ? loadingNode : ''}
    </section>
  );

}

CheckList.propTypes = propTypes;
CheckList.defaultProps = defaultProps;

export default CheckList;
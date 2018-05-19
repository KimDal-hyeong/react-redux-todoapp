import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  checked: PropTypes.bool,
  onChangeCheck: PropTypes.func,
  onClickDestroy: PropTypes.func,
  onEditTitle: PropTypes.func,
};

const defaultProps = {
  checked: false,
  onChangeCheck() {},
  onClickDestroy() {},
  onEditTitle() {},
};

class ListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      editValue: this.props.children,
    };
    this.handleLabelDoubleClick = this.handleLabelDoubleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  handleLabelDoubleClick() {
    this.setState({ editing: true });
  }

  handleInputChange(e) {
    this.setState({editValue: e.target.value})
  }

  handleInputKeyPress(e) {
    if(e.key === 'Enter'){
      this.props.onEditTitle(this.state.editValue);
      this.setState({ editing: false });
    }
  }

  handleInputBlur() {
    this.props.onEditTitle(this.state.editValue);
    this.setState({ editing: false });
  }

  componentDidUpdate() {
    this.editingInput.focus();
  }

  render() {
    const {
      checked,
      children,
      onChangeCheck,
      onClickDestroy,
    } = this.props;
    return (
      <li className={cx({'completed': checked, 'editing': this.state.editing})}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={checked}
            onChange={e => {onChangeCheck(e.target.checked)}}
          />
          <label
            onDoubleClick={this.handleLabelDoubleClick}
          >
            {children}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={onClickDestroy}
          />
        </div>
        <input
          className="edit"
          ref={ref => {this.editingInput = ref;}}
          value={this.state.editValue}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
          onKeyPress={this.handleInputKeyPress}
        />
      </li>
    )
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;
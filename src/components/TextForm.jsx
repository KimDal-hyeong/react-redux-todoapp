import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};

const defaultProps = {
  className: '',
  onChange() {},
  onSubmit() {},
  placeholder: '',
};

function TextForm(props) {
  const {
    className,
    onChange,
    onSubmit,
    placeholder,
  } = props;

  function handleKeypress(e) {
    if(e.key === 'Enter') {
      onSubmit(e.target.value);
      e.target.value = '';
    }
  }

  return (
    <input
      className={className}
      placeholder={placeholder}
      type="text"
      onChange={e => {onChange(e.target.value)}}
      onKeyPress={handleKeypress}
      {...props}
    />
  );
}

TextForm.propTypes = propTypes;
TextForm.defaultProps = defaultProps;

export default TextForm;
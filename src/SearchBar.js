import React from 'react';
import PropTypes from 'prop-types';
import FormText from './FormText';

export default SearchBar = ({
  border,
  iconPosition,
  keyboardType,
  placeholder,
  returnKeyType,
  onChange
}) => {
  return (
    <FormText
      border={border}
      icon={iconPosition == 'left' ?
        { left: { name: 'search' } } :
        { right: { name: 'search' } }
      }
      onChange={onChange}
      placeholder={placeholder}
      returnKeyType={returnKeyType} />
  );
}

SearchBar.propTypes = {
  border: PropTypes.bool,
  iconPosition: PropTypes.oneOf([
    'left', 'right'
  ]),
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.string
}

SearchBar.defaultProps = {
  border: false,
  iconPosition: 'left',
  placeholder: 'Search',
  returnKeyType: 'search'
}
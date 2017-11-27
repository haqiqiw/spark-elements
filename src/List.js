import React from 'react';
import {
  View,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

const List = props => {
  const { children, containerStyle, ...attributes } = props;
  return (
    <View
      style={[styles.listContainer, containerStyle != undefined && containerStyle]}
      {...attributes}
    >
      {children}
    </View>
  );
};

List.propTypes = {
  children: PropTypes.any,
  containerStyle: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#ffffff',
  },
});

export default List;
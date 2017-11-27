import React from 'react';
import {
  StyleSheet,
  ViewPropTypes,
  View,
} from 'react-native';

const Divider = ({
  style
}) => {
  return (<View style={[styles.container, style != undefined && style]} />);
}

Divider.propTypes = {
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: '#e1e8ee',
  },
});

export default Divider;
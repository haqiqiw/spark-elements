import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

export default LoadingOverlay = ({
  color
}) => {
  return (<View style={styles.overlay}>
    <ActivityIndicator
      color={color}
      size="large" />
  </View>);
}

LoadingOverlay.propTypes = {
  color: PropTypes.string
}
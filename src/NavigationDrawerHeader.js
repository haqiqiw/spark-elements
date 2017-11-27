import React from 'react';
import {
  Image,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default NavigationDrawerHeader = ({
  image,
  height,
  width,
  style,
}) => {
  return (<View style={style}>
    <Image
      source={image}
      style={[{
        width: height,
        height: width
      }]}
    />
  </View>);
}

NavigationDrawerHeader.defaultProps = {
  height: 100,
  width: 100
}

NavigationDrawerHeader.propTypes = {
  image: Image.propTypes.source.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  width: PropTypes.PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  style: ViewPropTypes.style
}
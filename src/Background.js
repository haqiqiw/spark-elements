import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

const Background = ({
  backgroundColor,
  style,
  children,
  header,
  footer
}) => {
  return (<View
    style={[
      { backgroundColor: backgroundColor },
      styles.root]}>
    <View style={[styles.container, style]}>
      {children}
    </View>
    {
      header &&
      <Image
        style={[styles.image, styles.header]}
        resizeMode="stretch"
        source={header}>
      </Image>
    }
    {
      footer && <Image
        style={[styles.image, styles.footer]}
        resizeMode="stretch"
        source={footer}>
      </Image>
    }
  </View>);
}

Background.propTypes = {
  backgroundColor: PropTypes.string,
  style: ViewPropTypes.style,
  children: PropTypes.any,
  header: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    PropTypes.number,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    PropTypes.number,
  ]),
}

Background.defaultProps = {
  backgroundColor: 'transparent'
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  image: {
    height: 80,
    width: Dimensions.get('window').width,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  header: {
    top: 0,
  },
  footer: {
    bottom: 0,
  }
});

export default Background;
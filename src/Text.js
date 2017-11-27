import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  PixelRatio,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const normalize = (size) => {
  const window = Dimensions.get('window');
  const pixelRatio = PixelRatio.get();
  const deviceWidth = window.width;
  const deviceHeight = window.height;
  if (pixelRatio === 2) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    } else if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (pixelRatio === 3) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }
  if (pixelRatio === 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (deviceHeight < 667) {
      return size * 1.20;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.40;
  }
  // if older device ie pixelRatio !== 2 || 3 || 3.5
  return size;
};

const fonts = {
  ios: {},
  android: {
    regular: {
      fontFamily: 'sans-serif',
    },
    light: {
      fontFamily: 'sans-serif-light',
    },
    condensed: {
      fontFamily: 'sans-serif-condensed',
    },
    condensed_light: {
      fontFamily: 'sans-serif-condensed',
      fontWeight: 'light',
    },
    black: {
      // note(brentvatne): sans-serif-black is only supported on Android 5+,
      // we can detect that here and use it in that case at some point.
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
    },
    bold: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
    },
  },
};

export default TextElement = (props) => {
  const { style, children, h1, h2, h3, h4, fontFamily, ...rest } = props;
  return (
    <Text
      style={[
        styles.text,
        h1 && { fontSize: normalize(40) },
        h2 && { fontSize: normalize(34) },
        h3 && { fontSize: normalize(28) },
        h4 && { fontSize: normalize(22) },
        h1 && styles.bold,
        h2 && styles.bold,
        h3 && styles.bold,
        h4 && styles.bold,
        fontFamily && { fontFamily },
        style != undefined && style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

TextElement.propTypes = {
  style: PropTypes.any,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  fontFamily: PropTypes.string,
  children: PropTypes.any,
};

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      android: {
        ...fonts.android.regular,
      },
    }),
  },
  bold: {
    ...Platform.select({
      android: {
        ...fonts.android.bold,
      },
    }),
  },
});
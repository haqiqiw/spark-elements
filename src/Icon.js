import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/SimpleLineIcons';

export default Icon = ({
  type,
  name,
  size,
  color,
  outline,
  position,
  style,
}) => {
  let icon = null;
  name = name.toLowerCase();
  switch (type) {
    case 'Entypo':
      icon = <Entypo name={name} size={size} color={color} />;
      break;
    case 'EvilIcons':
      icon = <EvilIcons name={name} size={size} color={color} />;
      break;
    case 'FontAwesome':
      icon = <FontAwesome name={name} size={size} color={color} />;
      break;
    case 'Foundation':
      icon = <Foundation name={name} size={size} color={color} />;
      break;
    case 'Ionicons':
      let iconName = Platform.select({
        ios: `ios-${name}`,
        android: `md-${name}`
      });
      if (Platform.OS === 'ios' && outline) {
        iconName = `${iconName}-outline`;
      }
      icon = <Ionicons name={iconName} size={size} color={color} />
      break;
    case 'MaterialCommunityIcons':
      icon = <MaterialCommunityIcons name={name} size={size} color={color} />
      break;
    case 'MaterialIcons':
      icon = <MaterialIcons name={name} size={size} color={color} />;
      break;
    case 'SimpleLineIcons':
      icon = <SimpleLineIcons name={name} size={size} color={color} />
      break;
    case 'Octicons':
      icon = <Octicons name={name} size={size} color={color} />
      break;
    case 'Zocial':
      icon = <Zocial name={name} size={size} color={color} />
      break;
  }

  let iconStyle = [];
  if (position !== undefined) {
    iconStyle.push(styles.icon);
    iconStyle.push(position == 'left' ? styles.left : styles.right);
  }
  if (style !== undefined) {
    iconStyle.push(style);
  }
  
  return iconStyle.length > 0 ?
    (<View style={iconStyle}>{icon}</View>) : (icon);
};

Icon.propTypes = {
  type: PropTypes
    .oneOf([
      'Entypo',
      'EvilIcons',
      'FontAwesome',
      'Foundation',
      'Ionicons',
      'MaterialCommunityIcons',
      'MaterialIcons',
      'Octicons',
      'SimpleLineIcons',
      'Zocial'
    ]),
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  outline: PropTypes.bool,
  position: PropTypes.oneOf([
    'left',
    'right',
  ]),
  style: ViewPropTypes.style,
};

Icon.defaultProps = {
  type: 'Ionicons',
  size: 20,
  color: "black"
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 99,
    top: 10,
  },
  left: {
    left: 55,
  },
  right: {
    right: 55,
  },
});
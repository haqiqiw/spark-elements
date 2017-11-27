import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Button = ({
  style,
  backgroundColor,
  width,
  height,
  marginTop,
  marginBottom,
  raised,
  text,
  textColor,
  textFont,
  iconType,
  iconName,
  iconColor,
  iconSize,
  iconStyle,
  iconOutline,
  iconPosition,
  onClick,
}) => {
  return (
    <View style={[
      styles.root, {
        width: width,
        marginTop: marginTop,
        marginBottom: marginBottom
      }, style, raised && require('./styles').default.raised]}>
      {
        (iconName != undefined &&
          (iconPosition === 'left' || iconPosition === 'right')
        ) && (<Icon
          type={iconType}
          name={iconName}
          size={iconSize}
          color={iconColor}
          stye={iconStyle}
          outline={iconOutline}
          position={iconPosition} />)
      }
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.container,
          { backgroundColor: backgroundColor, height: height }
        ]}
        onPress={onClick}>
        {text !== undefined ? typeof text === 'string' ? (
          <Text style={[styles.text, {
            fontFamily: textFont,
            color: textColor
          }]}>
            {text}
          </Text>
        ) : (text) : (iconPosition === 'center' && (
          <Icon
            type={iconType}
            name={iconName}
            size={iconSize}
            color={iconColor}
            stye={iconStyle}
            outline={iconOutline} />
        ))}
      </TouchableOpacity>
    </View>
  );
}

Button.propTypes = {
  style: ViewPropTypes.style,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  onClick: PropTypes.func,
  iconType: PropTypes.string,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  iconOutline: PropTypes.bool,
  iconStyle: ViewPropTypes.style,
  iconPosition: PropTypes.oneOf([
    'left', 'right', 'center'
  ]),
  raised: PropTypes.bool,
}

Button.defaultProps = {
  width: Dimensions.get('window').width,
  height: 40,
  backgroundColor: 'black',
  textColor: 'white',
  marginTop: 5,
  marginBottom: 5,
  iconPosition: 'left',
  raised: false,
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: 35,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
  },
})

export default Button;
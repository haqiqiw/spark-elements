import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from './Icon';

export default class FormText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: props.isPassword,
    };
  }

  render() {
    const {
      containerStyle,
      border,
      borderColor,
      borderWidth,
      fontFamily,
      textColor,
      textSize,
      textBackgroundColor,
      icon,
      isPassword,
      passwordIconColor,
      passwordIconSize,
      passwordIconPosition,
      keyboardType,
      placeholder,
      secureTextEntry,
      autoCorrect,
      autoCapitalize,
      returnKeyType,
      onSubmitEditing,
      maxLength,
      editable,
      value,
      placeholderTextColor,
      onChangeText,
    } = this.props;
    return (
      <View style={[
        styles.container,
        containerStyle
      ]}>
        {icon != undefined && icon.left !== undefined && (
          <Icon
            type={icon.left.type}
            name={icon.left.name}
            size={icon.left.size == undefined ? 20 : icon.left.size}
            color={icon.left.color == undefined ? 'black' : icon.left.color}
            outline={icon.left.outline}
            style={icon.left.style}
            position="left"
          />)
        }
        <TextInput
          style={[
            textInputStyle(
              border,
              borderColor,
              borderWidth,
              fontFamily,
              textColor,
              textSize,
              textBackgroundColor),
            { paddingLeft: icon != undefined && icon.left !== undefined ? 40 : 10 },
            { paddingRight: icon != undefined && icon.right !== undefined || isPassword ? 40 : 10 }
          ]}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ? secureTextEntry : this.state.showPass}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing ? onSubmitEditing : Keyboard.dismiss}
          maxLength={maxLength}
          editable={editable}
          value={value}
          placeholderTextColor={placeholderTextColor}
          underlineColorAndroid="transparent"
          onChangeText={onChangeText} />
        {isPassword && (
          <TouchableOpacity
            activeOpacity={0.7}
            style={passwordIconPosition === 'left' ? styles.iconLeft : styles.iconRight}
            onPress={() => this.setState({ showPass: !this.state.showPass })}>
            <Icon
              type="MaterialCommunityIcons"
              name={this.state.showPass ? 'eye-off' : 'eye'}
              size={passwordIconSize}
              color={passwordIconColor} />
          </TouchableOpacity>)
        }
        {(!isPassword && icon != undefined && icon.right !== undefined) && (
          <Icon
            type={icon.right.type}
            name={icon.right.name}
            size={icon.right.size == undefined ? 20 : icon.right.size}
            color={icon.right.color == undefined ? 'black' : icon.right.color}
            outline={icon.right.outline}
            style={icon.right.style}
            position="right" />)
        }
      </View>
    );
  }
}

FormText.propTypes = {
  icon: PropTypes.shape({
    left: PropTypes.shape({
      name: PropTypes.string,
      size: PropTypes.number,
      type: PropTypes.string,
      color: PropTypes.string,
      outline: PropTypes.bool,
      style: ViewPropTypes.style
    }),
    right: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      size: PropTypes.number,
      color: PropTypes.string,
      outline: PropTypes.bool,
      style: ViewPropTypes.style
    }),
  }),
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  border: PropTypes.bool,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  editable: PropTypes.bool,
  fontFamily: PropTypes.string,
  isPassword: PropTypes.bool,
  passwordIconPosition: PropTypes.oneOf([
    'left',
    'right'
  ]),
  passwordIconColor: PropTypes.string,
  passwordIconSize: PropTypes.number,
  maxLength: PropTypes.number,
  returnKeyType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  onChangeText: PropTypes.func,
  placeholderTextColor: PropTypes.string,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  textBackgroundColor: PropTypes.string,
  value: PropTypes.string,
};

FormText.defaultProps = {
  autoCapitalize: 'none',
  autoCorrect: false,
  border: false,
  borderColor: 'black',
  borderWidth: 1.5,
  editable: true,
  isPassword: false,
  passwordIconColor: 'black',
  passwordIconSize: 20,
  passwordIconPosition: 'right',
  placeholderTextColor: 'silver',
  returnKeyType: 'done',
  textColor: 'black',
  textSize: 14,
  textBackgroundColor: 'white',
};

const textInputStyle = (
  border,
  borderColor,
  borderWidth,
  fontFamily,
  textColor,
  textSize,
  textBackgroundColor
) => {
  let style = [{
    width: '100%',
    height: 40,
    borderRadius: 20,
    color: textColor,
    fontFamily: fontFamily,
    fontSize: textSize,
    backgroundColor: textBackgroundColor,
  }];
  if (border) {
    style.push({
      borderWidth: borderWidth,
      borderColor: borderColor,
    });
  }
  return style;
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconLeft: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 99,
    right: 55,
    top: 10,
  },
  iconRight: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 99,
    right: 55,
    top: 10,
  }
});
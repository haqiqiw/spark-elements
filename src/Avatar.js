import React from 'react';
import {
  View,
  Text as NativeText,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from './Icon';
import Text from './Text';

const DEFAULT_COLORS = ['#000', '#333', '#555', '#888', '#aaa', '#ddd'];

const Avatar = props => {
  const {
    component,
    onPress,
    onLongPress,
    containerStyle,
    icon,
    iconStyle,
    source,
    small,
    medium,
    large,
    xlarge,
    avatarStyle,
    rounded,
    title,
    titleStyle,
    overlayContainerStyle,
    activeOpacity,
    showEditButton,
    editButton,
    onEditPress,
    ...attributes
  } = props;

  let { width, height } = props;

  if (small || (!width && !height)) {
    width = 34;
    height = 34;
  } else if (medium) {
    width = 50;
    height = 50;
  } else if (large) {
    width = 75;
    height = 75;
  } else if (xlarge) {
    width = 150;
    height = 150;
  } else if (!width) {
    width = height;
  } else if (!height) {
    height = width;
  }

  const titleSize = width / 2;
  const iconSize = width / 2;

  let Component = onPress || onLongPress ? TouchableOpacity : View;
  if (component) {
    Component = component;
  }

  const renderUtils = () => {
    if (showEditButton) {
      const editButtonProps = { ...editButton };

      const defaultEditButtonSize = (width + height) / 2 / 3;
      const editButtonSize = editButton.size || defaultEditButtonSize;
      const editButtonSizeStyle = {
        width: editButtonSize,
        height: editButtonSize,
        borderRadius: editButtonSize / 2,
      };
      const editButtonIconSize = editButtonSize * 0.8;

      return (
        <TouchableHighlight
          style={[
            styles.editButton,
            editButtonSizeStyle,
            editButtonProps.style,
          ]}
          underlayColor={editButtonProps.underlayColor}
          onPress={onEditPress}
        >
          <View>
            <Icon
              size={editButtonIconSize}
              name={editButtonProps.iconName}
              type={editButtonProps.iconType}
              color={editButtonProps.iconColor}
            />
          </View>
        </TouchableHighlight>
      );
    }
  };

  const renderContent = () => {
    if (source) {
      return (
        <Image
          style={[
            styles.avatar,
            rounded && { borderRadius: width / 2 },
            avatarStyle != undefined && avatarStyle,
          ]}
          source={source}
        />
      );
    } else if (title) {
      let text = title.toUpperCase();
      if (title.length > 2) {
        const arr = text.split(' ');
        text = arr.length == 1 ? text = arr[0][0] : arr[0][0] + arr[arr.length - 1][0];
      }
      return (
        <Text style={[styles.title, titleStyle != undefined && titleStyle]}>
          {text}
        </Text>
      );
    } else if (icon) {
      return (
        <Icon
          type={icon.type != undefined && icon.type}
          name={icon.name || 'user'}
          size={icon.size || iconSize}
          color={icon.color || 'white'}
          style={iconStyle != undefined && iconStyle}
        />
      );
    }
  };

  const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      backgroundColor: 'transparent',
      width: width,
      height: height,
    },
    avatar: {
      width: width,
      height: height,
    },
    overlayContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignSelf: 'stretch',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    title: {
      color: '#ffffff',
      fontSize: titleSize,
      backgroundColor: 'rgba(0,0,0,0)',
      textAlign: 'center',
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: DEFAULT_COLORS[4],
      ...Platform.select({
        ios: {
          shadowColor: DEFAULT_COLORS[0],
          shadowOffset: { width: 1, height: 1 },
          shadowRadius: 2,
          shadowOpacity: 0.5,
        },
        android: {
          elevation: 1,
        },
      }),
    },
  });

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity}
      style={[
        styles.container,
        rounded && { borderRadius: width / 2 },
        containerStyle != undefined && containerStyle,
      ]}
      {...attributes}
    >
      <View
        style={[
          styles.overlayContainer,
          rounded && { borderRadius: width / 2 },
          overlayContainerStyle != undefined && overlayContainerStyle,
        ]}
      >
        {renderContent()}
      </View>
      {renderUtils()}
    </Component>
  );
};

const defaultProps = {
  showEditButton: false,
  onEditPress: null,
  editButton: {
    size: null,
    iconName: 'mode-edit',
    iconType: 'MaterialIcons',
    iconColor: 'white',
    underlayColor: DEFAULT_COLORS[0],
    style: null,
  },
};

Avatar.propTypes = {
  component: PropTypes.oneOf([
    View,
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  containerStyle: PropTypes.any,
  source: Image.propTypes.source,
  // source: PropTypes.oneOfType([
  //   PropTypes.shape({
  //     uri: PropTypes.string,
  //   }),
  //   PropTypes.number,
  //   Image.propTypes.source,
  // ]),
  avatarStyle: PropTypes.any,
  rounded: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: NativeText.propTypes.style,
  overlayContainerStyle: PropTypes.any,
  activeOpacity: PropTypes.number,
  icon: PropTypes.object,
  iconStyle: NativeText.propTypes.style,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  showEditButton: PropTypes.bool,
  onEditPress: PropTypes.func,
  editButton: PropTypes.shape({
    iconName: PropTypes.string,
    iconType: PropTypes.string,
    iconColor: PropTypes.string,
    size: PropTypes.number,
    underlayColor: PropTypes.string,
    style: ViewPropTypes.style,
  }),
};

Avatar.defaultProps = defaultProps;

export default Avatar;

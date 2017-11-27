import React from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  Text,
  Switch
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from './Icon';
import Avatar from './Avatar';
import Badge from './Badge';

const ListItem = props => {
  const {
    onPress,
    onLongPress,
    underlayColor,
    containerStyle,
    component,
    outerWrapperStyle,
    wrapperStyle,
    fontFamily,
    leftIcon,
    leftIconContainerStyle,
    avatarStyle,
    avatarContainerStyle,
    avatarOverlayContainerStyle,
    roundAvatar,
    titleContainerStyle,
    titleNumberOfLines,
    title,
    titleStyle,
    subtitleContainerStyle,
    subtitle,
    subtitleStyle,
    subtitleNumberOfLines,
    rightTitle,
    rightTitleContainerStyle,
    rightTitleStyle,
    rightTitleNumberOfLines,
    badge,
    hideChevron,
    chevronColor,
    rightIcon,
    switchButton,
    onSwitch,
    switchDisabled,
    switchOnTintColor,
    switchThumbTintColor,
    switchTintColor,
    switched,
    label,
    header,
    footer,
    ...attributes
  } = props;

  let { avatar } = props;
  let Component = onPress || onLongPress ? TouchableHighlight : View;
  if (component) {
    Component = component;
  }

  return (
    <Component
      onLongPress={onLongPress}
      onPress={onPress}
      underlayColor={underlayColor}
      style={[styles.container, containerStyle != undefined && containerStyle ]}
      {...attributes}
    >
      <View style={[styles.outerWrapper, outerWrapperStyle != undefined && outerWrapperStyle]}>
        {header != undefined && header}
        <View style={[styles.wrapper, wrapperStyle != undefined && wrapperStyle]}>
          {React.isValidElement(leftIcon)
            ? leftIcon
            : leftIcon &&
              leftIcon.name &&
              <View
                style={[
                  styles.iconStyle,
                  { flex: rightTitle && rightTitle !== '' ? 0.3 : 0.15 },
                  leftIconContainerStyle != undefined && leftIconContainerStyle,
                ]}
              >
                <Icon
                  type={leftIcon.type}
                  iconStyle={[styles.icon, leftIcon.style != undefined && leftIcon.style]}
                  name={leftIcon.name}
                  color={leftIcon.color || '#bdc6cf'}
                  size={leftIcon.size || 24}
                />
              </View>
          }
          {avatar &&
            <View style={styles.avatar}>
              {React.isValidElement(avatar)
                ? avatar
                : <Avatar
                    avatarStyle={avatarStyle != undefined && avatarStyle}
                    containerStyle={avatarContainerStyle != undefined && avatarContainerStyle}
                    overlayContainerStyle={
                      avatarOverlayContainerStyle != undefined && avatarOverlayContainerStyle
                    }
                    rounded={roundAvatar}
                    source={avatar}
                  />}
            </View>
          }
          <View style={styles.titleSubtitleContainer}>
            <View style={titleContainerStyle}>
              {title !== null &&
              (typeof title === 'string' || typeof title === 'number')
                ? <Text
                    numberOfLines={titleNumberOfLines}
                    style={[
                      styles.title,
                      !leftIcon && { marginLeft: 10 },
                      titleStyle != undefined && titleStyle,
                      fontFamily && { fontFamily },
                    ]}
                  >
                    {title}
                  </Text>
                : <View>
                    {title}
                  </View>}
            </View>
            <View style={subtitleContainerStyle}>
              {subtitle !== null &&
              (typeof subtitle === 'string' || typeof subtitle === 'number')
                ? <Text
                    numberOfLines={subtitleNumberOfLines}
                    style={[
                      styles.subtitle,
                      !leftIcon && { marginLeft: 10 },
                      subtitleStyle != undefined && subtitleStyle,
                      fontFamily && { fontFamily },
                    ]}
                  >
                    {subtitle}
                  </Text>
                : <View>
                    {subtitle}
                  </View>}
            </View>
          </View>
          {rightTitle &&
            rightTitle !== '' &&
            <View style={[styles.rightTitleContainer, rightTitleContainerStyle]}>
              <Text
                numberOfLines={rightTitleNumberOfLines}
                style={[styles.rightTitleStyle, rightTitleStyle]}
              >
                {rightTitle}
              </Text>
            </View>
          }
          {
            badge && !rightTitle && 
            <Badge {...badge} />
          }
          {!hideChevron &&
            (React.isValidElement(rightIcon)
              ? rightIcon
              : <View
                  style={styles.chevronContainer}
                >
                  <Icon
                    type={rightIcon.type}
                    iconStyle={rightIcon.style}
                    size={rightIcon.size}
                    name={rightIcon.name || 'chevron-right'}
                    color={rightIcon.color || chevronColor}
                  />
                </View>)
          }
          {switchButton &&
            hideChevron &&
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={onSwitch}
                disabled={switchDisabled}
                onTintColor={switchOnTintColor}
                thumbTintColor={switchThumbTintColor}
                tintColor={switchTintColor}
                value={switched}
              />
            </View>
          }
          {label != undefined && label}
        </View>  
        {footer != undefined && footer}
      </View> 
    </Component>
  );

};

ListItem.defaultProps = {
  underlayColor: 'white',
  roundAvatar: false,
  rightIcon: { type: 'MaterialIcons', name: 'chevron-right', size: 28 },
  chevronColor: '#bdc6cf',
  hideChevron: false,
  titleNumberOfLines: 1,
  subtitleNumberOfLines: 1,
  rightTitleNumberOfLines: 1,
  switchButton: false,
};

ListItem.propTypes = {
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  underlayColor: PropTypes.string,
  containerStyle: PropTypes.any,
  outerWrapperStyle: PropTypes.any,
  wrapperStyle: PropTypes.any,
  fontFamily: PropTypes.string,
  leftIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  leftIconContainerStyle: PropTypes.object,
  avatarStyle: PropTypes.object,
  avatarContainerStyle: PropTypes.object,
  avatarOverlayContainerStyle: PropTypes.object,
  titleContainerStyle: PropTypes.any,
  titleNumberOfLines: PropTypes.number,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  titleStyle: PropTypes.any,
  subtitleContainerStyle: PropTypes.object,
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  subtitleStyle: PropTypes.any,
  subtitleNumberOfLines: PropTypes.number,
  rightTitle: PropTypes.string,
  rightTitleContainerStyle: PropTypes.object,
  rightTitleStyle: Text.propTypes.style,
  rightTitleNumberOfLines: PropTypes.number,
  badge: PropTypes.any,
  hideChevron: PropTypes.bool,
  rightIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  switchButton: PropTypes.bool,
  onSwitch: PropTypes.func,
  switchDisabled: PropTypes.bool,
  switchOnTintColor: PropTypes.string,
  switchThumbTintColor: PropTypes.string,
  switchTintColor: PropTypes.string,
  switched: PropTypes.bool,
  label: PropTypes.any,
  header: PropTypes.any,
  footer: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  outerWrapper: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  wrapper: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  iconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  avatar: {
    width: 34,
    height: 34,
  },
  titleSubtitleContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: '#43484d',
  },
  subtitle: {
    color: '#86939e',
    fontSize: 12,
    marginTop: 1,
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      },
    }),
  },
  rightTitleContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightTitleStyle: {
    marginRight: 5,
    color: '#bdc6cf',
  },
  chevronContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  switchContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 5,
  },
});

export default ListItem;
import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';
import {
  createRouter,
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@expo/ex-navigation';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Icon from './Icon';

const _renderHeader = (
  avatar,
  content,
  backgroundColor,
  backgroundImage,
  height,
  width,
  style,
  avatarContainerStyle,
  avatarStyle,
  title,
  subtitle,
  headerTextStyle,
  titleStyle,
  subtitleStyle
) => {
  const headerStyle = {
    backgroundColor: backgroundColor,
    width: width,
    height: height
  };

  return (
    <ImageBackground source={backgroundImage} style={[styles.header, style, headerStyle]}>
      {content}
      <View style={[styles.headerAvatarContainer, avatarContainerStyle]}>
        {avatar && (<Avatar
          avatarStyle={avatarStyle}
          medium
          rounded
          title={avatar.name}
          source={avatar.image}
          onPress={avatar.onPress}
        />)}
      </View>
      <View style={[styles.headerTextContainer, headerTextStyle]}>
        {title && (<Text style={[styles.headerTitle, titleStyle]}>
          {title}
        </Text>)}
        {subtitle && (<Text style={[styles.headerSubTitle, subtitleStyle]}>
          {subtitle}
        </Text>)}
      </View>
    </ImageBackground>
  );
};

_renderHeader.propTypes = {
  content: PropTypes.element,
  backgroundColor: PropTypes.string,
  backgroundImage: Image.propTypes.source,
  height: PropTypes.number,
  width: PropTypes.number,
  style: ViewPropTypes.style,
  avatarContainerStyle: ViewPropTypes.style,
  avatarStyle: ViewPropTypes.style,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerTextStyle: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  subtitleStyle: Text.propTypes.style,
}

const _renderTitle = (
  isSelected,
  title,
  titleStyle,
  titleColor,
  selectedTitleStyle,
  selectedTitleColor,
) => {
  const extraStyle = { marginTop: 2 };
  const customTitleStyle = [
    styles.titleStyle,
    titleStyle,
    titleColor && { color: titleColor }
  ];
  if (isSelected) {
    customTitleStyle.push(
      styles.selectedTitleStyle,
      selectedTitleStyle,
      selectedTitleColor && { color: selectedTitleColor }
    );
  }
  return (
    <Text style={[extraStyle, customTitleStyle]}>
      {title}
    </Text>
  );
};

_renderTitle.propTypes = {
  isSelected: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: Text.propTypes.style,
  titleColor: PropTypes.string,
  selectedTitleStyle: Text.propTypes.style,
  selectedTitleColor: PropTypes.string,
}

const _renderIcon = (
  isSelected,
  icon,
  iconStyle,
  iconColor,
  iconSelectedColor,
  title,
  titleStyle,
  titleColor,
  selectedTitleStyle,
  selectedTitleColor,
) => {
  let color = icon.color;
  if (isSelected) {
    color = icon.selectedColor ? iconSelectedColor : iconSelectedColor;
  } else {
    color = icon.color ? icon.color : iconColor;
  }

  return (
    <View style={styles.iconTextContainer}>
      <View style={[styles.iconStyle, iconStyle]}>
        <Icon
          type={icon.type}
          name={icon.name}
          size={icon.size}
          color={color}
          outline={icon.outline}
        />
      </View>
      <View style={[styles.textStyle, { marginLeft: icon.size ? icon.size + 5 : 25 }]}>
        {title && _renderTitle(isSelected,
          title,
          titleStyle,
          titleColor,
          selectedTitleStyle,
          selectedTitleColor)}
      </View>
    </View>
  );
}

_renderIcon.propTypes = {
  icon: PropTypes.shape(Icon.propTypes),
  iconStyle: ViewPropTypes.style,
  iconColor: PropTypes.string,
  iconSelectedColor: PropTypes.string,
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  titleStyle: Text.propTypes.style,
  titleColor: PropTypes.string,
  selectedTitleStyle: Text.propTypes.style,
  selectedTitleColor: PropTypes.string,
}

export default NavigationDrawer = ({
  id,
  initialItem,
  drawerWidth,
  drawerItems,
  header,
  headerContent,
  selectedItemStyle,
  selectedItemColor,
  titleStyle,
  titleColor,
  selectedTitleStyle,
  selectedTitleColor,
  iconStyle,
  iconColor,
  iconSelectedColor,
  navigationBarTintColor,
  navigationBarBackgroundColor,
}) => {
  const initial = initialItem ? initialItem : (drawerItems.length > 0 ? drawerItems[0].route.routeName : null);
  return (
    <DrawerNavigation
      id={id}
      initialItem={initial}
      drawerWidth={drawerWidth}
      renderHeader={
        header ? () => _renderHeader(
          header.avatar,
          header.content,
          header.backgroundColor,
          header.backgroundImage,
          header.height,
          header.width,
          header.style,
          header.avatarContainerStyle,
          header.avatarStyle,
          header.title,
          header.subtitle,
          header.headerTextStyle,
          header.titleStyle,
          header.subtitleStyle) :
          headerContent ? () => { return headerContent; } :
            () => { return (<View style={styles.header} />) }
      }
    >
      {drawerItems.map(item => {
        return (
          <DrawerNavigationItem
            key={item.id}
            id={item.id}
            selectedStyle={[
              styles.selectedItemStyle,
              selectedItemStyle,
              selectedItemColor && { backgroundColor: selectedItemColor },
            ]}
            renderTitle={item.icon ? (null) :
              item.title ? (isSelected) =>
                _renderTitle(
                  isSelected,
                  item.title,
                  titleStyle,
                  titleColor,
                  selectedTitleStyle,
                  selectedTitleColor
                ) : (null)}
            renderIcon={item.icon ? item.title ?
              (isSelected) => _renderIcon(
                isSelected,
                item.icon,
                iconStyle,
                iconColor,
                iconSelectedColor,
                item.title,
                titleStyle,
                titleColor,
                selectedTitleStyle,
                selectedTitleColor
              ) : (isSelected) => _renderIcon(
                isSelected,
                item.icon,
                iconStyle,
                iconColor,
                iconSelectedColor,
              ) : (null)
            }
            onPress={item.onPress}
          >
            {item.route && (<StackNavigation
              defaultRouteConfig={{
                navigationBar: {
                  title: item.title,
                  backgroundColor: navigationBarBackgroundColor,
                  tintColor: navigationBarTintColor,
                }
              }}
              initialRoute={item.route}
            />)}
          </DrawerNavigationItem>);
      })}
    </DrawerNavigation>);
}
NavigationDrawer.defaultProps = {
  id: 'drawer',
  initialItem: undefined,
  drawerWidth: 300,
  drawerItems: [],
  header: {},
  // headerContent: {},
  // selectedItemStyle: {},
  // selectedItemColor: 'lightgray',
  // titleStyle: {},
  // titleColor: 'black',
  // selectedTitleStyle: {},
  // selectedTitleColor: 'white',
  // iconStyle: {},
  // iconColor: 'black',
  // iconSelectedColor: 'white',
  // navigationBarTintColor: 'white',
  // navigationBarBackgroundColor: 'blue',
};

NavigationDrawer.propTypes = {
  id: PropTypes.string,
  initialItem: PropTypes.string,
  drawerWidth: PropTypes.number,
  drawerItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      icon: PropTypes.shape(Icon.propTypes),
      route: PropTypes.obj,//PropTypes.instanceOf(ExNavigationRoute),
      onPress: PropTypes.func
    })
  ),
  header: PropTypes.shape(_renderHeader.propTypes),
  headerContent: PropTypes.element,
  selectedItemStyle: ViewPropTypes.style,
  selectedItemColor: PropTypes.string,
  titleStyle: Text.propTypes.style,
  titleColor: PropTypes.string,
  selectedTitleStyle: Text.propTypes.style,
  selectedTitleColor: PropTypes.string,
  iconStyle: ViewPropTypes.style,
  iconColor: PropTypes.string,
  iconSelectedColor: PropTypes.string,
  navigationBarTintColor: PropTypes.string,
  navigationBarBackgroundColor: PropTypes.string,
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    padding: 10,
  },
  headerAvatarContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerTextContainer: {
    backgroundColor: 'transparent'
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  headerSubTitle: {
    fontSize: 14,
    color: 'white'
  },
  iconTextContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  iconStyle: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
  },
  textStyle: {
    position: 'absolute',
    zIndex: 0,
  },
  titleStyle: {
    color: 'black'
  },
  selectedTitleStyle: {
    color: 'white'
  },
  selectedItemStyle: {
    backgroundColor: 'lightgray'
  }
});
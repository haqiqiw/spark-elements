import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';
import {
  TabNavigation,
  TabNavigationItem
} from '@expo/ex-navigation';
import PropTypes from 'prop-types';
import Icon from './Icon';

const renderIcon = (
  isSelected,
  icon,
  iconColor,
  iconSelectedColor,
) => {
  const {
    type,
    name,
    size,
    outline,
  } = icon;
  return (
    <Icon
      type={type}
      name={name}
      size={size}
      color={isSelected ? iconSelectedColor : iconColor}
      outline={outline}
    />
  );
};

renderIcon.propTypes = {
  isSelected: PropTypes.boolean,
  icon: Icon.propTypes,
  iconSelectedColor: PropTypes.string,
}

export const renderTitle = (
  isSelected,
  title,
  textStyle,
  textSelectedStyle
) => {
  return (
    <Text style={[
      styles.textStyle,
      textStyle,
      isSelected && styles.textSelectedStyle,
      isSelected && textSelectedStyle,
    ]}>
      {title}
    </Text>
  );
};

renderTitle.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  textStyle: ViewPropTypes.style,
  textSelectedStyle: ViewPropTypes.style,
}

export default NavigationTab = ({
  initialTab,
  initialItem,
  tabItems,
  tabStyle,
  tabSelectedStyle,
  textStyle,
  textSelectedStyle,
  iconColor,
  iconSelectedColor,
}) => {
  return (
    <TabNavigation
      initialTab={initialTab}
      initialItem={tabItems[0].route}>
      {tabItems.map((item) => {
        return (
          <TabNavigationItem
            style={[
              styles.tabStyle,
              tabStyle,
            ]}
            selectedStyle={[
              styles.tabSelectedStyle,
              tabSelectedStyle
            ]}
            id={item.route}
            key={item.route}
            title={item.title}
            renderTitle={isSelected => renderTitle(
              isSelected,
              item.title,
              textStyle,
              textSelectedStyle,
            )}
            renderIcon={item.icon && (isSelected => renderIcon(
              isSelected,
              item.icon,
              iconColor,
              iconSelectedColor,
            ))}
          >
            {item.content}
          </TabNavigationItem>
        );
      })
      }
    </TabNavigation>
  );
};
NavigationTab.defaultProps = {
  iconColor: 'white',
  iconSelectedColor: 'black',
}

NavigationTab.propTypes = {
  // initialTab: TabNavigation.propTypes.initialTab,
  // initialItem: TabNavigation.propTypes.initialItem,
  tabItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    icon: PropTypes.shape({
      type: PropTypes.string,
      name: PropTypes.string,
      size: PropTypes.number,
      outline: PropTypes.boolean,
    }),
    content: PropTypes.object.isRequired
  })).isRequired,
  tabStyle: ViewPropTypes.style,
  tabSelectedStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  textSelectedStyle: Text.propTypes.style,
  iconColor: PropTypes.string,
  iconSelectedColor: PropTypes.string,
}

const IMAGE_SIZE = Dimensions.get('window').width / 2 - 16;

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: 'gray',
  },
  tabSelectedStyle: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'white',
  },
  textSelectedStyle: {
    color: 'black',
  },
});

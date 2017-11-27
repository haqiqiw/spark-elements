import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import PropTypes from 'prop-types';

const Badge = props => {
  const {
    containerStyle,
    textStyle,
    wrapperStyle,
    onPress,
    component,
    value,
    children,
    element,
    ...attributes
  } = props;

  if (element) return element;

  let Component = View;
  let childElement = (
    <Text style={[styles.text, textStyle != undefined && textStyle]}>
      {value}
    </Text>
  );

  if (children) {
    childElement = children;
  }

  if (children && value) {
    console.error('Badge can only contain either child element or value');
  }

  if (!component && onPress) {
    Component = TouchableOpacity;
  }

  if (React.isValidElement(component)) {
    Component = component;
  }

  return (
    <View style={[styles.container, wrapperStyle != undefined && wrapperStyle]}>
      <Component
        style={[styles.badge, containerStyle != undefined && containerStyle]}
        onPress={onPress}
        {...attributes}
      >
        {childElement}
      </Component>
    </View>
  );
};

Badge.propTypes = {
  containerStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  textStyle: Text.propTypes.style,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  component: PropTypes.func,
  element: PropTypes.element,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  badge: {
    padding: 12,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#43484d',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
});

export default Badge;
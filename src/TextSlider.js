import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Icon from './Icon';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class TextSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    if (this.props.onPositionChange) {
      this.props.onPositionChange(this.props.data[this.state.position], this.state.position)
    }
  }

  slide(direction) {
    if (direction == 'left') {
      if (this.state.position - 1 >= 0) {
        this.setState({
          position: this.state.position - 1
        }, this.onChange)
      }
    } else {
      if (this.state.position + 1 < this.props.data.length) {
        this.setState({
          position: this.state.position + 1
        }, this.onChange)
      }
    }
  }

  onSwipeLeft() {
    this.slide('right');
  }

  onSwipeRight() {
    this.slide('left')
  }

  getText(string, start, length, position) {
    let result = position == 'left' ? '...' : '';
    result += string.length > length ? string.substring(start, start + length) : string;
    result += position == 'left' ? '' : '...';
    return result;
  }

  render() {
    const {
      data,
      children,
      textStyle,
      iconLeftSize,
      iconLeftColor,
      iconRightSize,
      iconRightColor,
      height,
      maxLength,
    } = this.props;
    const {
      position
    } = this.state;

    let leftText = '';
    let centerText = '';
    let righText = '';

    if (typeof data[position] === 'string') {
      leftText = position > 0 && this.getText(data[position - 1], data[position - 1].length - maxLength, maxLength, 'left');
      centerText = data[position];
      righText = position < data.length - 1 && this.getText(data[position + 1].substring(0, maxLength), 'right');
    } else {
      leftText = position > 0 && this.getText(data[position - 1].label, data[position - 1].label.length - maxLength, maxLength, 'left');
      centerText = data[position].label;
      righText = position < data.length - 1 && this.getText(data[position + 1].label.substring(0, maxLength), 'right');
    }

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      <GestureRecognizer
        style={styles.flex}
        config={config}
        onSwipeLeft={(state) => this.onSwipeLeft()}
        onSwipeRight={(state) => this.onSwipeRight()}>
        <View style={[styles.center, { height: height }]}>
          <TouchableOpacity
            style={[styles.icon, styles.iconLeft]}
            onPress={() => this.slide('left')}>
            <Icon
              type="FontAwesome"
              name="chevron-left"
              color={iconLeftColor}
              size={iconLeftSize}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.icon, styles.iconRight]}
            onPress={() => this.slide('right')}>
            <Icon
              type="FontAwesome"
              name="chevron-right"
              color={iconRightColor}
              size={iconLeftSize}
            />
          </TouchableOpacity>
          <View style={[{ width: SCREEN_WIDTH }]}>
            <View style={[styles.flex, styles.flexRow]} >
              <View style={[styles.center, styles.flex, styles.itemLeft]} >
                {position > 0 && (
                  <Text numberOfLines={1}>
                    {leftText}
                  </Text>)}
              </View>
              <View style={[styles.center, styles.flex, styles.itemCenter]} >
                <Text numberOfLines={1}>
                  {centerText}
                </Text>
              </View>
              <View style={[styles.center, styles.flex, styles.itemRight]} >
                {position < data.length - 1 && (<Text numberOfLines={1}>
                  {righText}
                </Text>)}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.flex}>
          {children}
        </View>
      </GestureRecognizer>);
  }
}

TextSlider.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string
      }),
    ]),
  ),
  children: PropTypes.element,
  textStyle: ViewPropTypes.style,
  iconLeftSize: PropTypes.number,
  iconLeftColor: PropTypes.string,
  iconRightSize: PropTypes.number,
  iconRightColor: PropTypes.string,
  height: PropTypes.number,
  maxLength: PropTypes.number,
  onPositionChange: PropTypes.func
}

TextSlider.defaultProps = {
  height: 30,
  maxLength: 3,
}

const styles = {
  flex: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 99,
  },
  iconLeft: {
    left: 0,
  },
  iconRight: {
    right: 0
  },
  center: {
    justifyContent: 'center',
  },
  textStyle: {

  },
  itemLeft: {
    marginLeft: 20, alignItems: 'flex-start'
  },
  itemCenter: {
    alignItems: 'center'
  },
  itemRight: {
    marginRight: 20,
    alignItems: 'flex-end'
  }
}
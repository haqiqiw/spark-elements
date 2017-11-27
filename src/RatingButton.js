import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  ViewPropTypes,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import Icon from './Icon';

export default class RatingButton extends Component {
  constructor(props) {
    super(props);

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  static propTypes = {
    ...(ViewPropTypes || View.PropTypes),
    disabled: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    onStarButtonPress: PropTypes.func.isRequired,
    iconSet: PropTypes.string.isRequired,
    starSize: PropTypes.number.isRequired,
    starIconName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number,
    ]).isRequired,
    starColor: PropTypes.string.isRequired,
    starStyle: ViewPropTypes.style,
    buttonStyle: ViewPropTypes.style,
    halfStarEnabled: PropTypes.bool.isRequired,
    reversed: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    starStyle: {},
    buttonStyle: {},
  }

  onButtonPress(event) {
    const {
      halfStarEnabled,
      starSize,
      rating,
      onStarButtonPress,
    } = this.props;

    let addition = 0;

    if (halfStarEnabled) {
      const isHalfSelected = event.nativeEvent.locationX < starSize / 2;
      addition = isHalfSelected ? - 0.5 : 0;
    }

    onStarButtonPress(rating + addition);
  }

  renderIcon() {
    const {
      iconSet,
      starIconName,
      starSize,
      starColor,
      starStyle,
      reversed,
    } = this.props;

    let iconElement;

    // To check if we need to reverse the star icon
    const newStarStyle = update(starStyle, {
      transform: {
        $set: [
          {
            scaleX: reversed ? -1 : 1,
          },
        ],
      },
    });

    if (typeof starIconName === 'string') {
      iconElement = (
        <Icon
          type={iconSet}
          name={starIconName}
          size={starSize}
          color={starColor}
          style={newStarStyle}
        />
      );
    } else {
      const imageStyle = {
        width: starSize,
        height: starSize,
        resizeMode: 'contain',
      };

      const iconStyles = [
        imageStyle,
        newStarStyle,
      ];

      iconElement = (
        <Image
          source={starIconName}
          style={iconStyles}
        />
      );
    }

    return iconElement;
  }

  render() {
    const {
      disabled,
      buttonStyle,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.2}
        disabled={disabled}
        style={buttonStyle}
        onPress={this.onButtonPress}
        accessibilityTraits="button"
        accessibilityComponentType="button"
      >
        <View>
          {this.renderIcon()}
        </View>
      </TouchableOpacity>
    );
  }

}
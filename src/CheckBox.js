import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.isChecked,
    }
  }

  static propTypes = {
    ...(ViewPropTypes || View.PropTypes),
    topText: PropTypes.string,
    topTextView: PropTypes.element,
    topTextStyle: Text.propTypes.style,
    bottomText: PropTypes.string,
    bottomTextView: PropTypes.element,
    bottomTextStyle: Text.propTypes.style,
    leftText: PropTypes.string,
    leftTextView: PropTypes.element,
    leftTextStyle: Text.propTypes.style,
    rightText: PropTypes.string,
    rightTextView: PropTypes.element,
    rightTextStyle: Text.propTypes.style,
    checkedImage: PropTypes.element,
    unCheckedImage: PropTypes.element,
    onClick: PropTypes.func,
    isChecked: PropTypes.bool.isRequired,
    isIndeterminate: PropTypes.bool.isRequired,
    checkBoxColor: PropTypes.string,
    disabled: PropTypes.bool,
    style: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
  }

  static defaultProps = {
    isChecked: false,
    isIndeterminate: false,
    leftTextStyle: {},
    rightTextStyle: {}
  }

  onClick() {
    this.setState({
      isChecked: !this.state.isChecked
    })
    if(this.props.onClick)this.props.onClick();
  }

  _renderTop() {
    if (this.props.topTextView)return this.props.topTextView;
    if (!this.props.topText)return null;
    return (
      <Text style={[styles.topText, this.props.topTextStyle]}>{this.props.topText}</Text>
    );
  }
  
  _renderBottom() {
    if (this.props.bottomTextView)return this.props.bottomTextView;
    if (!this.props.bottomText)return null;
    return (
      <Text style={[styles.bottomText, this.props.bottomTextStyle]}>{this.props.bottomText}</Text>
    );
  }
  
  _renderLeft() {
    if (this.props.leftTextView)return this.props.leftTextView;
    if (!this.props.leftText)return null;
    return (
      <Text style={[styles.leftText, this.props.leftTextStyle]}>{this.props.leftText}</Text>
    );
  }
  
  _renderRight() {
    if (this.props.rightTextView)return this.props.rightTextView;
    if (!this.props.rightText)return null;
    return (
      <Text style={[styles.rightText, this.props.rightTextStyle]}>{this.props.rightText}</Text>
    );
  }

  _renderImage() {
    if (this.props.isIndeterminate){
      return this.props.indeterminateImage ? this.props.indeterminateImage : this.genCheckedImage();
    }
    if (this.state.isChecked) {
      return this.props.checkedImage ? this.props.checkedImage : this.genCheckedImage();
    } else {
      return this.props.unCheckedImage ? this.props.unCheckedImage : this.genCheckedImage();
    }
  }

  genCheckedImage() {
    var source;
    if (this.props.isIndeterminate) {
      source = require('./assets/images/ic_indeterminate_check_box.png');
    }
    else {
      source = this.state.isChecked ? require('./assets/images/ic_check_box.png') : require('./assets/images/ic_check_box_outline_blank.png');
    }

    return (
      <Image source={source} style={{tintColor: this.props.checkBoxColor}} />
    );
  }

  render() {
      return (
          <TouchableHighlight
              style={this.props.style}
              onPress={()=>this.onClick()}
              underlayColor='transparent'
              disabled={this.props.disabled}
          >
              <View style={[
                styles.containerColumn,
                this.props.containerStyle
              ]}>
                  {this._renderTop()}
                  <View style={styles.containerRow}>
                      {this._renderLeft()}
                      {this._renderImage()}
                      {this._renderRight()}
                  </View>
                  {this._renderBottom()}
              </View>
          </TouchableHighlight>
      );
  }
}
const styles = StyleSheet.create({
  containerColumn: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  topText: {
    marginBottom: 10
  },
  bottomText: {
    marginTop: 10
  },
  leftText: {
    marginRight: 10
  },
  rightText: {
    marginLeft: 10
  }
});
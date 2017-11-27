import React, { Component } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

export default class DialogInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      visible: false,
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.defaultValue });
  }

  componentWillReceiveProps(nextProps) {
    const { visible, defaultValue } = nextProps;
    this.setState({ visible, value: defaultValue ? defaultValue : '' });
  }

  _onChangeText = (value) => {
    this.setState({ value });
    this.props.onChangeText(value);
  };

  _onSubmitPress = () => {
    const { value } = this.state;
    this.props.onSubmit(value);
  };

  _onCancelPress = () => {
    this.props.onCancel ? this.props.onCancel() : this.setState({ visible: false, value: '' });
  };

  _onTapBackground = () => {
    this.props.onTapBackground ? this.props.onTapBackground() : this._onCancelPress();
  };

  setModalVisible(visible) {
    this.setState({ visible: visible });
  }

  _renderDialog = () => {
    const {
      title,
      placeholder,
      defaultValue,
      buttons,
      cancelText,
      submitText,
      borderColor,
      dialogStyle,
      dialogTitleStyle,
      titleStyle,
      dialogBodyComponent,
      dialogBodyText,
      dialogBodyTextStyle,
      dialogInputComponent,
      buttonStyle,
      buttonTextStyle,
      submitButtonStyle,
      submitButtonTextStyle,
      cancelButtonStyle,
      cancelButtonTextStyle,
      inputStyle,
    } = this.props;
    return (
      <View style={styles.dialog} key="dialog">
        <TouchableWithoutFeedback onPress={this._onTapBackground}>
          <View style={styles.dialogOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.dialogContent, { borderColor }, dialogStyle]}>
          {title ? (<View style={[styles.dialogTitle, dialogTitleStyle, { borderColor }]}>
            <Text style={[styles.dialogTitleText, titleStyle]}>
              {title}
            </Text>
          </View>) : (null)}
          <View style={styles.dialogBody}>
            {dialogBodyComponent ? dialogBodyComponent : (dialogBodyText && (
              <Text style={[styles.dialogBodyTextStyle, dialogBodyTextStyle]}>
                {dialogBodyText}
              </Text>
            ))}
            {dialogInputComponent ? dialogInputComponent : (
              <TextInput
                style={[styles.dialogInput, inputStyle]}
                defaultValue={defaultValue}
                onChangeText={this._onChangeText}
                placeholder={placeholder}
                autoFocus={true}
                underlineColorAndroid="transparent"
                {...this.props.textInputProps} />
            )}
          </View>
          {buttons && buttons.length > 0 ? <View style={[styles.dialogFooter, { borderColor }]}>
            {buttons.map(item => {
              return (<TouchableWithoutFeedback
                key={item.text}
                onPress={() => {
                  item.onPress ? item.onPress(this.state.value) : this.setState({ value: '' })
                }}>
                <View style={[styles.dialogAction, buttonStyle, item.buttonStyle]}>
                  <Text style={[styles.dialogActionText, buttonTextStyle, item.buttonTextStyle]}>
                    {item.text}
                  </Text>
                </View>
              </TouchableWithoutFeedback>);
            })}
          </View> : (<View style={[styles.dialogFooter, { borderColor }]}>
            <TouchableWithoutFeedback onPress={this._onCancelPress}>
              <View style={[styles.dialogAction, buttonStyle, cancelButtonStyle]}>
                <Text style={[styles.dialogActionText, buttonTextStyle, cancelButtonTextStyle]}>
                  {cancelText}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this._onSubmitPress}>
              <View style={[styles.dialogAction, buttonStyle, submitButtonStyle]}>
                <Text style={[styles.dialogActionText, buttonTextStyle, submitButtonTextStyle]}>
                  {submitText}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>)
          }
        </View>
      </View>
    );
  };

  render() {
    const {
      animationType
    } = this.props;
    return (
      <Modal
        animationType={animationType}
        onRequestClose={() => this.setModalVisible(false)}
        transparent={true}
        visible={this.props.visible}
      >
        {this._renderDialog()}
      </Modal>
    );
  }
}

DialogInput.propTypes = {
  animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
  title: PropTypes.string,
  visible: PropTypes.bool,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onTapBackground: PropTypes.func,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  onChangeText: PropTypes.func,
  borderColor: PropTypes.string,
  dialogStyle: ViewPropTypes.style,
  dialogTitleStyle: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  dialogBodyComponent: PropTypes.element,
  dialogBodyText: PropTypes.string,
  dialogBodyTextStyle: Text.propTypes.style,
  dialogInputComponent: PropTypes.element,
  buttons: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func
  })),
  buttonStyle: ViewPropTypes.style,
  buttonTextStyle: Text.propTypes.style,
  submitButtonStyle: ViewPropTypes.style,
  submitButtonTextStyle: Text.propTypes.style,
  cancelButtonStyle: ViewPropTypes.style,
  cancelButtonTextStyle: Text.propTypes.style,
  inputStyle: TextInput.propTypes.style,
  textInputProps: PropTypes.object,
};

DialogInput.defaultProps = {
  animationType: 'none',
  visible: false,
  defaultValue: '',
  cancelText: 'Cancel',
  submitText: 'OK',
  borderColor: '#ccc',
  onChangeText: () => {},
};

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  dialogContent: {
    elevation: 5,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden'
  },
  dialogTitle: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  dialogTitleText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  dialogBody: {
    paddingHorizontal: 10
  },
  dialogBodyTextStyle: {
    paddingVertical: 10,
    textAlign: 'center',
  },
  dialogInput: {
    marginBottom: 10,
    textAlign: 'center',
  },
  dialogFooter: {
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  dialogAction: {
    flex: 1,
    padding: 15
  },
  dialogActionText: {
    textAlign: 'center',
    color: '#006dbf'
  }
});
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  Modal,
  TouchableHighlight,
  DatePickerAndroid,
  TimePickerAndroid,
  DatePickerIOS,
  Platform,
  Animated,
  Keyboard,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Icon from './Icon';

const FORMATS = {
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD HH:mm',
  'time': 'HH:mm'
};

const SUPPORTED_ORIENTATIONS = [
  'portrait', 
  'portrait-upside-down', 
  'landscape', 
  'landscape-left', 
  'landscape-right'
];

export default class FormDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.getDate(),
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      allowPointerEvents: true
    };

    this.getDate = this.getDate.bind(this);
    this.getDateStr = this.getDateStr.bind(this);
    this.datePicked = this.datePicked.bind(this);
    this.onPressDate = this.onPressDate.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressConfirm = this.onPressConfirm.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onPressMask = this.onPressMask.bind(this);
    this.onDatePicked = this.onDatePicked.bind(this);
    this.onTimePicked = this.onTimePicked.bind(this);
    this.onDatetimePicked = this.onDatetimePicked.bind(this);
    this.onDatetimeTimePicked = this.onDatetimeTimePicked.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  // componentWillMount() {
  //   // ignore the warning of Failed propType for date of DatePickerIOS, will remove after being fixed by official
  //   console.ignoredYellowBox = [
  //     'Warning: Failed propType'
  //     // Other warnings you don't want like 'jsSchedulingOverhead',
  //   ];
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      this.setState({ date: this.getDate(nextProps.date) });
    }
  }

  setModalVisible(visible) {
    const {
      iosModalHeight,
      duration
     } = this.props;

    // slide animation
    if (visible) {
      this.setState({ modalVisible: visible });
      return Animated.timing(
        this.state.animatedHeight,
        {
          toValue: iosModalHeight,
          duration: duration
        }
      ).start();
    } else {
      return Animated.timing(
        this.state.animatedHeight,
        {
          toValue: 0,
          duration: duration
        }
      ).start(() => {
        this.setState({ modalVisible: visible });
      });
    }
  }

  onStartShouldSetResponder(e) {
    return true;
  }

  onMoveShouldSetResponder(e) {
    return true;
  }

  onPressMask() {
    if (typeof this.props.onPressMask === 'function') {
      this.props.onPressMask();
    } else {
      this.onPressCancel();
    }
  }

  onPressCancel() {
    this.setModalVisible(false);
    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal();
    }
  }

  onPressConfirm() {
    this.datePicked();
    this.setModalVisible(false);
    if (typeof this.props.onCloseModal === 'function') {
      this.props.onCloseModal();
    }
  }

  getDate(date = this.props.date) {
    const { mode, minDate, maxDate, format = FORMATS[mode] } = this.props;
    if (!date) {
      const now = new Date();
      if (minDate) {
        const _minDate = this.getDate(minDate);
        if (now < _minDate) {
          return _minDate;
        }
      }
      if (maxDate) {
        const _maxDate = this.getDate(maxDate);

        if (now > _maxDate) {
          return _maxDate;
        }
      }
      return now;
    }
    if (date instanceof Date) {
      return date;
    }
    return Moment(date, format).toDate();
  }

  getDateStr(date = this.props.date) {
    const { mode, format = FORMATS[mode] } = this.props;

    if (date instanceof Date) {
      return Moment(date).format(format);
    } else {
      return Moment(this.getDate(date)).format(format);
    }
  }

  datePicked() {
    if (typeof this.props.onDateChange === 'function') {
      this.props.onDateChange(this.getDateStr(this.state.date), this.state.date);
    }
  }

  getTitleElement() {
    const { date, dateTextStyle, textColor, placeholder, placeholderTextStyle, placeholderTextColor } = this.props;
    if (!date && placeholder) {
      return (<Text style={[styles.placeholderText, placeholderTextStyle, { color: placeholderTextColor }]}>{placeholder}</Text>);
    }
    return (<Text style={[styles.dateText, dateTextStyle, { color: textColor }]}>{this.getDateStr()}</Text>);
  }

  onDateChange(date) {
    this.setState({
      allowPointerEvents: false,
      date: date
    })
    const timeoutId = setTimeout(() => {
      this.setState({
        allowPointerEvents: true
      })
      clearTimeout(timeoutId)
    }, 200);
  }

  onDatePicked({ action, year, month, day }) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day)
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }

  onTimePicked({ action, hour, minute }) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: Moment().hour(hour).minute(minute).toDate()
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }

  onDatetimePicked({ action, year, month, day }) {
    const { mode, androidMode, format = FORMATS[mode], is24Hour = !format.match(/h|a/) } = this.props;
    if (action !== DatePickerAndroid.dismissedAction) {
      const timeMoment = Moment(this.state.date);
      TimePickerAndroid.open({
        hour: timeMoment.hour(),
        minute: timeMoment.minutes(),
        is24Hour: is24Hour,
        mode: androidMode
      }).then(this.onDatetimeTimePicked.bind(this, year, month, day));
    } else {
      this.onPressCancel();
    }
  }

  onDatetimeTimePicked(year, month, day, { action, hour, minute }) {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day, hour, minute)
      });
      this.datePicked();
    } else {
      this.onPressCancel();
    }
  }

  onPressDate() {
    if (this.props.disabled) {
      return true;
    }
    Keyboard.dismiss();
    // reset state
    this.setState({
      date: this.getDate()
    });
    if (Platform.OS === 'ios') {
      this.setModalVisible(true);
    } else {
      const { mode, androidMode, format = FORMATS[mode], minDate, maxDate, is24Hour = !format.match(/h|a/) } = this.props;
      if (mode === 'date') {
        DatePickerAndroid.open({
          date: this.state.date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate),
          mode: androidMode
        }).then(this.onDatePicked);
      } else if (mode === 'time') {
        const timeMoment = Moment(this.state.date);
        TimePickerAndroid.open({
          hour: timeMoment.hour(),
          minute: timeMoment.minutes(),
          is24Hour: is24Hour
        }).then(this.onTimePicked);
      } else if (mode === 'datetime') {
        DatePickerAndroid.open({
          date: this.state.date,
          minDate: minDate && this.getDate(minDate),
          maxDate: maxDate && this.getDate(maxDate),
          mode: androidMode
        }).then(this.onDatetimePicked);
      }
    }

    if (typeof this.props.onOpenModal === 'function') {
      this.props.onOpenModal();
    }
  }

  _renderIcon() {
    const {
      dateIconStyle,
      showIcon,
      iconComponent,
      iconColor,
      iconPosition,
      iconSize,
      iconOutline,
    } = this.props;

    if (showIcon) {
      if (!!iconComponent) {
        return iconComponent;
      }
      return (
        <Icon
          style={dateIconStyle}
          type="Ionicons"
          name="calendar"
          size={iconSize}
          color={iconColor}
          position={iconPosition}
          outline={iconOutline}
        />
      );
    }
    return null;
  }

  render() {
    const {
      border,
      borderColor,
      mode,
      style,

      btnCancelStyle,
      btnTextCancelStyle,
      btnConfirmStyle,
      btnTextConfirmStyle,
      dateInputStyle,
      datePickerStyle,
      datePickerConStyle,
      dateTouchBodyStyle,
      disabledStyle,

      disabled,
      minDate,
      maxDate,
      minuteInterval,
      timeZoneOffsetInMinutes,
      cancelBtnText,
      confirmBtnText,
      TouchableComponent,
      testID,
      cancelBtnTestID,
      confirmBtnTestID
    } = this.props;

    const dateInput = [
      styles.dateInput, dateInputStyle,
      disabled && styles.disabled,
      disabled && disabledStyle
    ];

    return (
      <View style={[styles.container, style]}>
        {this._renderIcon()}
        <TouchableComponent
          style={[
            styles.dateTouch,
            border && styles.border,
            { borderColor: borderColor },
            datePickerStyle
          ]}
          underlayColor="transparent"
          onPress={this.onPressDate}
          testID={testID}
        >
          <View style={[styles.dateTouchBody, dateTouchBodyStyle]}>
            {
              !this.props.hideText &&
              (<View style={dateInput}>
                {this.getTitleElement()}
              </View>)
            }
            {
              Platform.OS === 'ios' && <Modal
                transparent={true}
                animationType="none"
                visible={this.state.modalVisible}
                supportedOrientations={SUPPORTED_ORIENTATIONS}
                onRequestClose={() => { this.setModalVisible(false); }}
              >
                <View
                  style={{ flex: 1 }}
                >
                  <TouchableComponent
                    style={styles.datePickerMask}
                    activeOpacity={1}
                    underlayColor="#00000077"
                    onPress={this.onPressMask}
                  >
                    <TouchableComponent
                      underlayColor="white"
                      style={{ flex: 1 }}
                    >
                      <Animated.View
                        style={[styles.datePickerCon, { height: this.state.animatedHeight }, datePickerConStyle]}
                      >
                        <View pointerEvents={this.state.allowPointerEvents ? 'auto' : 'none'}>
                          <DatePickerIOS
                            date={this.state.date}
                            mode={mode}
                            minimumDate={minDate && this.getDate(minDate)}
                            maximumDate={maxDate && this.getDate(maxDate)}
                            onDateChange={this.onDateChange}
                            minuteInterval={minuteInterval}
                            timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
                            style={[styles.datePicker, datePickerStyle]}
                          />
                        </View>
                        <TouchableComponent
                          underlayColor={'transparent'}
                          onPress={this.onPressCancel}
                          style={[styles.btnText, styles.btnCancel, btnCancelStyle]}
                          testID={cancelBtnTestID}
                        >
                          <Text
                            style={[styles.btnTextConfirm, styles.btnTextCancel, btnTextCancelStyle]}
                          >
                            {cancelBtnText}
                          </Text>
                        </TouchableComponent>
                        <TouchableComponent
                          underlayColor={'transparent'}
                          onPress={this.onPressConfirm}
                          style={[styles.btnText, styles.btnConfirm, btnConfirmStyle]}
                          testID={confirmBtnTestID}
                        >
                          <Text style={[styles.btnTextConfirm, btnTextConfirmStyle]}>{confirmBtnText}</Text>
                        </TouchableComponent>
                      </Animated.View>
                    </TouchableComponent>
                  </TouchableComponent>
                </View>
              </Modal>
            }
          </View>
        </TouchableComponent>
      </View>
    );
  }
}

FormDatePicker.propTypes = {
  border: PropTypes.bool,
  borderColor: PropTypes.string,

  iconColor: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconSize: PropTypes.number,
  iconOutline: PropTypes.bool,
  iconComponent: PropTypes.element,

  mode: PropTypes.oneOf(['date', 'datetime', 'time']),
  androidMode: PropTypes.oneOf(['calendar', 'spinner', 'default']),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  format: PropTypes.string,
  minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  iosModalHeight: PropTypes.number,
  duration: PropTypes.number,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,

  placeholder: PropTypes.string,
  placeholderTextStyle: Text.propTypes.style,
  placeholderTextColor: PropTypes.string,
  textColor: PropTypes.string,

  datePickerStyle: ViewPropTypes.style,
  dateTextStyle: Text.propTypes.style,
  dateIconStyle: ViewPropTypes.style,
  dateInputStyle: ViewPropTypes.style,
  disabledStyle: ViewPropTypes.style,
  dateTouchBodyStyle: ViewPropTypes.style,
  datePickerConStyle: ViewPropTypes.style,
  btnCancelStyle: TouchableHighlight.propTypes.style,
  btnTextCancelStyle: Text.propTypes.style,
  btnConfirmStyle: TouchableHighlight.propTypes.style,
  btnTextConfirmStyle: Text.propTypes.style,

  showIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  onDateChange: PropTypes.func,
  onOpenModal: PropTypes.func,
  onCloseModal: PropTypes.func,
  onPressMask: PropTypes.func,

  modalOnResponderTerminationRequest: PropTypes.func,
  is24Hour: PropTypes.bool
};

FormDatePicker.defaultProps = {
  border: false,

  iconPosition: 'left',
  iconSize: 20,
  iconOutline: false,

  mode: 'date',
  androidMode: 'default',
  date: '',
  format: "MMMM-DD-YYYY",
  // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
  iosModalHeight: 259,
  // slide animation duration time, default to 300ms, IOS only
  duration: 300,
  confirmBtnText: 'Confirm',
  cancelBtnText: 'Cancel',
  // whether or not show the icon
  showIcon: true,
  disabled: false,
  hideText: false,

  TouchableComponent: TouchableHighlight,
  modalOnResponderTerminationRequest: e => true
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  border: {
    borderRadius: 20,
    borderWidth: 1.5,
  },
  dateTouch: {
    // width: 142,
    width: '100%',
    height: 40,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'white',
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateInput: {
    flex: 1,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  dateText: {
    color: 'darkslategrey',
    fontSize: 14,
  },
  placeholderText: {
    color: 'silver',
    fontSize: 14,
  },
  datePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077'
  },
  datePickerCon: {
    backgroundColor: 'white',
    height: 0,
    overflow: 'hidden'
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTextConfirm: {
    color: 'mediumaquamarine',
    fontSize: 16,
  },
  btnTextCancel: {
    color: 'dimgray',
    fontSize: 16,
  },
  btnCancel: {
    left: 0
  },
  btnConfirm: {
    right: 0
  },
  datePicker: {
    marginTop: 42,
    borderTopColor: 'lightgray',
    borderTopWidth: 1
  },
  disabled: {
    backgroundColor: 'whitesmoke'
  }
});
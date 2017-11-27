import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Modal,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes as RNViewPropTypes,
} from 'react-native';
import FormText from './FormText';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

let componentIndex = 0;

export default class FormChooser extends Component {
  constructor(props) {
    super(props);
    this._bind(
      'onChange',
      'open',
      'close',
      'renderChildren'
    );
    this.state = {
      modalVisible: false,
      transparent: false,
      selected: 'please select',
    };
  }

  _bind(...methods) {
    methods.forEach(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.setState({ selected: this.props.initValue });
    this.setState({ cancelText: this.props.cancelText });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initValue !== this.props.initValue) {
      this.setState({ selected: nextProps.initValue });
    }
  }

  onChange(item) {
    this.props.onChange(item);
    this.setState({ selected: item.label });
    this.close();
  }

  close() {
    this.setState({
      modalVisible: false,
    });
  }

  open() {
    this.setState({
      modalVisible: true,
    });
  }

  renderSection(section) {
    return (
      <View key={section.key} style={[styles.sectionStyle, this.props.sectionStyle]}>
        <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>{section.label}</Text>
      </View>
    );
  }

  renderOption(option) {
    return (
      <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
        <View style={[styles.optionStyle, this.props.optionStyle]}>
          <Text style={[styles.optionTextStyle, this.props.optionTextStyle]}>{option.label}</Text>
        </View>
      </TouchableOpacity>);
  }

  renderOptionList() {
    const options = this.props.data.map(item => {
      if (item.section) {
        return this.renderSection(item);
      }
      return this.renderOption(item);
    });

    return (
      <View style={[styles.overlayStyle, this.props.overlayStyle]} key={'modalSelector' + (componentIndex++)}>
        <View style={[styles.optionContainer, this.props.optionContainerStyle]}>
          <ScrollView keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}>
            <View style={{ paddingHorizontal: 10 }}>
              {options}
            </View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={this.close}>
            <View style={[styles.cancelStyle, this.props.cancelStyle]}>
              <Text style={[styles.cancelTextStyle, this.props.cancelTextStyle]}>{this.props.cancelText}</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>);
  }

  renderChildren() {
    const {
      children,
      border,
      borderColor,
      icon,
      iconPosition,
      textColor,
      placeholder,
      placeholderTextColor
    } = this.props;

    if (children) {
      return children;
    }

    return (
      <FormText
        border={border}
        borderColor={borderColor}
        icon={icon !== undefined ?
          iconPosition === 'left' ?
            { left: icon } :
            { right: icon } :
          (undefined)
        }
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        textColor={textColor}
        editable={false}
        value={this.state.selected} />
    );
  }

  render() {
    const dp = (
      <Modal
        transparent
        ref={element => this.model = element}
        supportedOrientations={this.props.supportedOrientations}
        visible={this.state.modalVisible}
        onRequestClose={this.close}
        animationType={this.props.animationType}
      >
        {this.renderOptionList()}
      </Modal>
    );

    return (
      <View style={this.props.style}>
        {dp}
        <TouchableOpacity onPress={this.open} disabled={this.props.disabled}>
          <View pointerEvents="none">
            {this.renderChildren()}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

FormChooser.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })),
  onChange: PropTypes.func,
  initValue: PropTypes.string,

  border: PropTypes.bool,
  borderColor: PropTypes.string,
  icon: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    outline: PropTypes.bool,
  }),
  iconPosition: PropTypes.oneOf([
    'left', 'right'
  ]),
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  textColor: PropTypes.string,
  animationType: Modal.propTypes.animationType,
  style: ViewPropTypes.style,
  optionStyle: ViewPropTypes.style,
  optionTextStyle: Text.propTypes.style,
  optionContainerStyle: ViewPropTypes.style,
  sectionStyle: ViewPropTypes.style,
  sectionTextStyle: Text.propTypes.style,
  cancelStyle: ViewPropTypes.style,
  cancelTextStyle: Text.propTypes.style,
  overlayStyle: ViewPropTypes.style,
  cancelText: PropTypes.string,
  disabled: PropTypes.bool,
  supportedOrientations: PropTypes.arrayOf(
    PropTypes.oneOf([
      'portrait',
      'landscape',
      'portrait-upside-down',
      'landscape-left',
      'landscape-right'
    ])
  ),
  keyboardShouldPersistTaps: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
};

FormChooser.defaultProps = {
  data: [],
  onChange: () => { },
  initValue: '',

  border: false,
  borderColor: 'black',
  iconPosition: 'left',

  animationType: 'slide',
  style: {},
  optionStyle: {},
  optionTextStyle: {},
  optionContainerStyle: {},
  sectionStyle: {},
  sectionTextStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: 'Cancel',
  disabled: false,
  supportedOrientations: ['portrait', 'landscape'],
  keyboardShouldPersistTaps: 'always',
};

const PADDING = 8;
const BORDER_RADIUS = 5;
const FONT_SIZE = 16;
const HIGHLIGHT_COLOR = 'rgba(0,118,255,0.9)';

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  optionContainer: {
    borderRadius: BORDER_RADIUS,
    flex: 1,
    marginBottom: 8,
    padding: PADDING,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  cancelContainer: {
    flex: 1,
    maxHeight: 30,
    alignSelf: 'stretch',
  },
  cancelStyle: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: PADDING,
  },
  cancelTextStyle: {
    textAlign: 'center',
    color: 'darkslategray',
    fontSize: FONT_SIZE,
  },
  optionStyle: {
    padding: PADDING,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  optionTextStyle: {
    textAlign: 'center',
    fontSize: FONT_SIZE,
    color: HIGHLIGHT_COLOR,
  },
  sectionStyle: {
    padding: PADDING * 2,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  sectionTextStyle: {
    textAlign: 'center',
    fontSize: FONT_SIZE,
  },
});
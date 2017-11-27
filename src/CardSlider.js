import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const xOffset = new Animated.Value(0);
// const onScroll = Animated.event(
//   [{ nativeEvent: { contentOffset: { x: xOffset } } }],
//   { useNativeDriver: true }
// );

export default class CardSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      item: this.props.data[0]
    }
  }

  rotateTransform(index) {
    return {
      transform: [{
        rotate: xOffset.interpolate({
          inputRange: [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
          outputRange: ['30deg', '0deg', '-30deg'],
        })
      }]
    };
  }

  onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: xOffset } } }],
    {
      useNativeDriver: true,
      listener: event => {
        const x = event.nativeEvent.contentOffset.x;
        if (x % SCREEN_WIDTH == 0) {
          this.setState({
            index: x / SCREEN_WIDTH,
            item: this.props.data[x / SCREEN_WIDTH]
          }, () => this.props.onItemChange ? this.props.onItemChange(this.state.item) : null);
        }
      },
    },
  );

  render() {
    const {
      data,
      pageStyle,
      cardStyle,
    } = this.props;
    const dataId = [];

    for (var i = 0; i < data.length; i++) {
      const temp = Object.assign({}, data[i]);
      temp['indexCounter'] = i;
      dataId.push(temp);
    }

    return (
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={this.onScroll}
        horizontal
        pagingEnabled
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        {dataId.map(item => {
          return (
            <View key={item.indexCounter} style={[styles.page, pageStyle]}>
              <Animated.View style={[styles.card, cardStyle, this.rotateTransform(item.indexCounter)]}>
                <Text>{item.label}</Text>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  }
}

CardSlider.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string
    })
  ),
  onItemChange: PropTypes.func,
  pageStyle: ViewPropTypes.style,
  cardStyle: ViewPropTypes.style,
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
  },
  page: {
    width: SCREEN_WIDTH,
    padding: 20,
  },
  card: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#F5FCFF',
  }
});
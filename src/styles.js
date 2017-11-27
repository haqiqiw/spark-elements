import {
  Dimensions,
  Platform,
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 99,
  },
  right: {
    right: 55,
    top: 10,
  },
  left: {
    left: 55,
    top: 10,
  },
  raised: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  overlay: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
});
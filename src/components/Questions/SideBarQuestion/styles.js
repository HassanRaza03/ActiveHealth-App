// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme';

export default StyleSheet.create({
  sliderDummy: {
    backgroundColor: 'rgba(175, 54, 218, 0.4)',
    width: 300,
    height: 25,
    borderRadius: 20,
    position: 'absolute',
    zIndex: 11,
  },
  sliderReal: {
    backgroundColor: Colors.background.primary,
    borderRadius: 20,
    height: 25,
  },
});

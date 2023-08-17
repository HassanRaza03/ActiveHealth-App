// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  YesBtn: {
    backgroundColor: '#af36da',
    borderRadius: 8,
    marginTop: 30,
    height: 51,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  YesTxt: {
    color: Colors.white,
  },
  noBtn: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginTop: 10,
    height: 51,
    borderWidth: 1,
    borderColor: Colors.background.primary,
  },
  noTxt: {
    color: Colors.background.primary,
  },
});

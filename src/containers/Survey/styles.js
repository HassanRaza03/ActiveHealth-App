// @flow
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    paddingTop: 30,
  },
  viewSelected: {
    width: 323,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  selectionView: {
    flex: 0.5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTxt: {fontSize: 14, fontWeight: '500'},
  button: {
    backgroundColor: '#AF36DA',
    alignSelf: 'center',
    width: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  YesTxt: {color: 'white'},
});

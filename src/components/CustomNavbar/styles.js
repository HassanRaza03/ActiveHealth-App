// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.transparent,
    paddingTop: Metrics.statusBarHeight,
    paddingHorizontal: Metrics.smallMargin,
    height: Metrics.navBarHeight,
    justifyContent: 'center',
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey3,
  },
  btnImage: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    tintColor: 'white',
  },
  btnWrapper: {
    padding: Metrics.smallMargin,
    justifyContent: 'center',
    marginRight: 8,
    minWidth: 80,
  },
  rightBtn: {
    alignItems: 'flex-end',
  },
  searchHeader: {
    height: Metrics.navBarHeight + 50,
  },
  txt: {fontWeight: '600'},
});

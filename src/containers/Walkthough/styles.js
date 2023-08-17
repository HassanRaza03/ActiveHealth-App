// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    paddingTop: Metrics.statusBarHeight,
  },
  skipBtnView: {
    width: '100%',
    height: 20,
    position: 'absolute',
    top: Metrics.statusBarHeight,
    right: 0,
    zIndex: 11,
    marginTop: 40,
  },
  skipBtnTxt: {
    color: Colors.white,
    fontSize: 14,
    alignSelf: 'flex-end',
    right: 15,
  },
  messagetxt: {position: 'absolute', bottom: 0, width: '100%'},
  goalTxtView: {marginBottom: 50, alignItems: 'center'},
  goalTxt: {fontSize: 33, color: Colors.white},
  goalTxtMessage: {
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center',
    width: 250,
  },
});

// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderRadius: Metrics.borderRadius,
    padding: 8,
    marginTop: 3,
    // fontFamily: Fonts.type.base,
    color: Colors.white,
    fontSize: Fonts.size.xSmall,
    width: '90%',

    marginLeft: 2,
  },
  buttonOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowIcon: {
    // width: 18,
    // height: 18,
    right: 5,
  },
  rightIcon: {
    width: 22,
    height: 18,
    position: 'absolute',
    right: 4,
    bottom: -10,
  },
  multilineInput: {
    height: 120,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'top',
  },
  lablestyle: {
    fontSize: 12,
    fontWeight: '400',
  },
});

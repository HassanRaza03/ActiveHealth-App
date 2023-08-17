// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    paddingTop: 30,
  },
  txtLogin: {
    width: '100%',
    marginTop: 25,
  },
  nextBtn: {
    backgroundColor: '#af36da',
    borderRadius: 8,
    marginTop: 60,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  loginTxt: {
    color: Colors.white,
  },
  labelStyle: {color: 'white'},
  inputViewStyles: {
    borderColor: Colors.white,
    borderBottomWidth: 1,
    width: '100%',
  },
  forgetView: {marginTop: 10, alignSelf: 'flex-end'},
  forgetTxt: {color: Colors.white, fontSize: 14, fontWeight: '400'},

  accountTxtView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 40,
  },
  accountTxt: {color: Colors.white, fontSize: 14, fontWeight: '400'},
  signUpTxt: {color: Colors.white, fontSize: 14, fontWeight: '700'},
  codeFieldRoot: {
    marginTop: 30,
    width: 250,
    alignSelf: 'center',
  },
  cell: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  focusCell: {},
  countioneBtn: {
    backgroundColor: '#af36da',
    borderRadius: 8,
    marginTop: 30,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  contiueTxt: {
    color: Colors.white,
  },
});

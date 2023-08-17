// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    paddingTop: 30,
  },
  profileView: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: Colors.background.primary,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameTxt: {fontSize: 18, fontWeight: '600', marginTop: 20},
  emailTxt: {fontSize: 14, fontWeight: '300', marginTop: 5},
  channgeView: {
    height: 60,
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  iconView: {
    width: 45,
    height: 45,
    borderRadius: 6,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeTxt: {marginLeft: 5, fontSize: 14, fontWeight: '300', flex: 1},
  logoutBtn: {
    alignSelf: 'center',
    bottom: 60,
    width: '90%',
    height: 50,
    backgroundColor: '#AF36DA',
    borderRadius: 11,
  },
  logoutTxt: {fontSize: 16, color: Colors.white, fontWeight: '500'},
  labelStyle: {color: 'black'},
  inputViewStyles: {
    borderColor: Colors.black,
    borderBottomWidth: 1,
    width: '100%',
    color: Colors.black,
  },
  txtLogin: {
    width: '100%',
    marginTop: 25,
    color: Colors.black,
  },
});

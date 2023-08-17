// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
  },
  btnView: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: 'rgba(204, 193, 255, 0.8)',
    height: 63,
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  deviceIconVIew: {
    backgroundColor: '#AF36DA',
    width: 45,
    height: 45,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    flex: 0.95,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  modalContainer: {
    backgroundColor: Colors.white,
  },
  button: {
    backgroundColor: '#AF36DA',
    alignSelf: 'center',
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    elevation: 0,
  },
  YesTxt: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
  cancelButton: {
    backgroundColor: '#AF36DA',
    alignSelf: 'center',
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    elevation: 0,
  },
  noTxt: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

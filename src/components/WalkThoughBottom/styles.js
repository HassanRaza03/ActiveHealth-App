// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    marginBottom: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  stepView: {
    flexDirection: 'row',
    width: 50,
    justifyContent: 'space-around',
  },
  dotView: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cba2ed',
  },
  selectedDotLine: {
    width: 15,
    height: 3,
    backgroundColor: Colors.white,
    right: 10,
    borderRadius: 5,
  },
  nextBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

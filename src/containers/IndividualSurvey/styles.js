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
  nextBtn: {
    backgroundColor: '#af36da',
    borderRadius: 8,
    marginTop: 30,
    borderWidth: 1,
    borderColor: Colors.white,
    // width: '90%',
    flex: 1,
    alignSelf: 'center',
  },
  nextTxt: {
    color: Colors.white,
  },
  backBtn: {
    backgroundColor: '#af36da',
    borderRadius: 8,
    marginTop: 30,
    borderWidth: 1,
    borderColor: Colors.white,
    // width: '30%',
    flex: 0.3,
    alignSelf: 'center',
  },
  backTxt: {
    color: Colors.white,
  },
  exitBtn: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.background.primary,
    width: '90%',
    alignSelf: 'center',
  },
  exitTxt: {
    color: Colors.background.primary,
  },
  lineParent: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
  doneLine: {
    height: 8,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(109, 98, 222, 0.1)',
  },
  scrollView: {width: '100%', paddingBottom: 20, flex: 1},
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
  },
  activityWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey6,
    paddingTop: 30,
  },
  chartParent: {
    width: '90%',
    height: 270,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 10,
  },
  totalParent: {paddingLeft: 10, marginTop: 10},
  measurementText: {fontSize: 20, fontWeight: '600', color: Colors.black},
  barChart: {
    flex: 1,
    marginLeft: -20,
    overflow: 'hidden',
    width: '100%',
    height: 250,
  },
  listParent: {margin: 20, flex: 1, marginBottom: 10},
  fltListView1: {
    width: '100%',
    height: 80,
    backgroundColor: Colors.white,
    marginTop: 15,
    borderRadius: 16,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fltListView2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(171, 57, 218, 0.4)',
  },
  timeText: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(164, 169, 173, 1)',
    marginTop: 5,
  },
});

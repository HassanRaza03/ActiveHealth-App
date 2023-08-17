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
  itemView: {
    width: 323,
    minHeight: 70,
    paddingTop: 10,
    backgroundColor: Colors.white,
    marginTop: 20,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingRight: 10,
    alignItems: 'center',
  },
  surveryIconView: {
    width: 45,
    height: 45,
    backgroundColor: '#AF36DA',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTxt: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap',
  },
  timeText: {marginLeft: 10, fontSize: 12, fontWeight: '300'},
});

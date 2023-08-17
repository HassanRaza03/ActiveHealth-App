// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  //new

  itemView: {
    width: 323,
    minHeight: 70,
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
  textsParent: {flex: 1, justifyContent: 'center'},
  timeText: {marginLeft: 10, fontSize: 12, fontWeight: '300'},
  itemTxt: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap',
  },
  countView: {
    flexDirection: 'row',
    backgroundColor: '#AF36DA',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  countText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

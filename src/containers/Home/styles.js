import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey6,
    paddingTop: 30,
  },
  nameView: {marginHorizontal: 30},
  nameTxt: {fontSize: 24, fontWeight: '600'},
  sleepView: {
    width: '90%',
    backgroundColor: Colors.background.primary,
    height: 90,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  fitbitView: {
    width: 45,
    height: 45,
    backgroundColor: Colors.white,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fitbit: {marginLeft: 10, color: Colors.white, fontSize: 14},
  fitbitSync: {marginLeft: 10, color: Colors.white, fontSize: 12},
  sleepMainView: {
    height: 120,
    width: '90%',
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  innerViewSleep: {
    flex: 0.8,
    justifyContent: 'space-around',
    marginHorizontal: 20,
    paddingLeft: 20,
  },
  sleepTxt: {fontSize: 14, fontWeight: '500'},
  innerTxtViewSleep: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeTxt: {fontSize: 14, fontWeight: '600'},
  asleepTxt: {
    fontSize: 12,
    color: 'rgba(29, 27, 37, 0.7)',
    fontWeight: '400',
    marginTop: 5,
  },
  mintTxt: {fontSize: 14, fontWeight: '600'},
  awakeTxt: {
    fontSize: 12,
    color: 'rgba(29, 27, 37, 0.7)',
    fontWeight: '400',
    marginTop: 5,
  },
  twoBlockView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    width: '90%',
    flex: 1,
    justifyContent: 'space-between',
  },
  firstBlockView: {
    flex: 0.48,
    // height: 175,
    borderRadius: 12,
    backgroundColor: Colors.white,
    padding: 20,
    justifyContent: 'space-between',
  },
  heartTxt: {fontSize: 14, fontWeight: '500'},
  heartBitTxt: {fontSize: 20, fontWeight: '600'},
  lastUpdateTxt: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(29, 27, 37, 0.7)',
  },
  secondBlockView: {
    flex: 0.48,
    // height: 175,
    borderRadius: 12,
    backgroundColor: Colors.white,

    padding: 20,
    justifyContent: 'space-between',
  },
  waterTxt: {fontSize: 14, fontWeight: '500'},
  litrTxt: {fontSize: 20, fontWeight: '600'},
  container2: {
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
  txt: {flex: 0.95, marginLeft: 10, fontSize: 16, fontWeight: '500'},
});
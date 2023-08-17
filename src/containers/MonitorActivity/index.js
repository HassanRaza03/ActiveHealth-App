import {
  View,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import styles from './styles';
import {CustomNavbar, Text} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {BarChart} from 'react-native-chart-kit';
import {MONITOR_TYPE} from '../../constants';
import {
  getSleepRangeDataRequest,
  getActivityRangeRequest,
  getSPO2RangeDataRequest,
  getBrRangeDataRequest,
} from '../../redux/slicers/user';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

export default function MonitorActivity({route}) {
  const {monitorType, measurement} = route.params;
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.data?.user);
  const fitbitToken = user?.fitbit?.token;
  const sleepTokenPayload = {
    token: fitbitToken,
  };
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [total, setTotal] = useState(0);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    switch (monitorType) {
      case MONITOR_TYPE.SLEEP.monitorType:
        dispatch(
          getSleepRangeDataRequest({
            payloadData: sleepTokenPayload,
            responseCallback: (status, respData) => {
              setLoading(false);
              if (status) {
                const {sleep} = respData;
                const tempListData = [];
                const graphDaysLabels = [];
                const graphDaysData = [];
                const graphData = {
                  labels: [],
                  datasets: [
                    {
                      data: [],
                    },
                  ],
                };
                for (const sleepDay in sleep) {
                  if (sleep.hasOwnProperty.call(sleep, sleepDay)) {
                    const element = sleep[sleepDay];
                    graphDaysLabels.push(
                      moment(element.dateOfSleep).format('ddd'),
                    );
                    graphDaysData.push(element.minutesAsleep);
                    tempListData.push({
                      data: (element.minutesAsleep / 60).toFixed(2),
                      time: moment(element.startTime).fromNow(true),
                    });
                  }
                }
                graphData.labels = graphDaysLabels.reverse();
                graphData.datasets[0].data = graphDaysData.reverse();
                setTotal(graphDaysData.reduce((a, b) => a + b, 0) / 60);
                setData(graphData);
                setListData(tempListData);
              } else {
                navigate.goBack();
              }
            },
          }),
        );
        break;
      case MONITOR_TYPE.CALORIES.monitorType:
        dispatch(
          getActivityRangeRequest({
            payloadData: {...sleepTokenPayload, ...{resource: 'calories'}},
            responseCallback: (status, respData) => {
              setLoading(false);
              if (status) {
                const tempListData = [];
                const graphDaysLabels = [];
                const graphDaysData = [];
                const graphData = {
                  labels: [],
                  datasets: [
                    {
                      data: [],
                    },
                  ],
                };
                respData['activities-calories']?.forEach(element => {
                  graphDaysLabels.push(moment(element.dateTime).format('ddd'));
                  graphDaysData.push(element.value);
                  tempListData.push({
                    data: element.value,
                    time: moment(element.dateTime).fromNow(true),
                  });
                });
                graphData.labels = graphDaysLabels;
                graphData.datasets[0].data = graphDaysData;
                setTotal(
                  graphDaysData.reduce(
                    (a, b) => parseInt(a, 10) + parseInt(b, 10),
                    0,
                  ),
                );
                setData(graphData);
                setListData(tempListData.reverse());
              } else {
                navigate.goBack();
              }
            },
          }),
        );
        break;
      case MONITOR_TYPE.STEPS.monitorType:
        dispatch(
          getActivityRangeRequest({
            payloadData: {...sleepTokenPayload, ...{resource: 'steps'}},
            responseCallback: (status, respData) => {
              setLoading(false);
              if (status) {
                const tempListData = [];
                const graphDaysLabels = [];
                const graphDaysData = [];
                const graphData = {
                  labels: [],
                  datasets: [
                    {
                      data: [],
                    },
                  ],
                };
                respData['activities-steps']?.forEach(element => {
                  graphDaysLabels.push(moment(element.dateTime).format('ddd'));
                  graphDaysData.push(element.value);
                  tempListData.push({
                    data: element.value,
                    time: moment(element.dateTime).fromNow(true),
                  });
                });
                graphData.labels = graphDaysLabels;
                graphData.datasets[0].data = graphDaysData;
                setTotal(
                  graphDaysData.reduce(
                    (a, b) => parseInt(a, 10) + parseInt(b, 10),
                    0,
                  ),
                );
                setData(graphData);
                setListData(tempListData.reverse());
              } else {
                navigate.goBack();
              }
            },
          }),
        );
        break;
      case MONITOR_TYPE.SPO2.monitorType:
        dispatch(
          getSPO2RangeDataRequest({
            payloadData: sleepTokenPayload,
            responseCallback: (status, respData) => {
              setLoading(false);
              if (status) {
                const tempListData = [];
                const graphDaysLabels = [];
                const graphDaysData = [];
                const graphData = {
                  labels: [],
                  datasets: [
                    {
                      data: [],
                    },
                  ],
                };
                respData.forEach(element => {
                  graphDaysLabels.push(moment(element.dateTime).format('ddd'));
                  graphDaysData.push(element.value.avg);
                  tempListData.push({
                    data: element.value.avg,
                    time: moment(element.dateTime).fromNow(true),
                  });
                });
                graphData.labels = graphDaysLabels;
                graphData.datasets[0].data = graphDaysData;
                setTotal(
                  graphDaysData.reduce(
                    (a, b) => parseInt(a, 10) + parseInt(b, 10),
                    0,
                  ) / graphDaysData.length,
                );
                setData(graphData);
                setListData(tempListData.reverse());
              } else {
                navigate.goBack();
              }
            },
          }),
        );
        break;
      case MONITOR_TYPE.BREATHING_RATE.monitorType:
        dispatch(
          getBrRangeDataRequest({
            payloadData: sleepTokenPayload,
            responseCallback: (status, respData) => {
              setLoading(false);
              if (status) {
                const tempListData = [];
                const graphDaysLabels = [];
                const graphDaysData = [];
                const graphData = {
                  labels: [],
                  datasets: [
                    {
                      data: [],
                    },
                  ],
                };
                respData?.br.forEach(element => {
                  graphDaysLabels.push(moment(element.dateTime).format('ddd'));
                  graphDaysData.push(element.value.breathingRate);
                  tempListData.push({
                    data: element.value.breathingRate,
                    time: moment(element.dateTime).fromNow(true),
                  });
                });
                graphData.labels = graphDaysLabels;
                graphData.datasets[0].data = graphDaysData;
                setTotal(
                  graphDaysData.reduce(
                    (a, b) => parseInt(a, 10) + parseInt(b, 10),
                    0,
                  ) / graphDaysData.length,
                );
                setData(graphData);
                setListData(tempListData.reverse());
              } else {
                navigate.goBack();
              }
            },
          }),
        );
        break;
      default:
        break;
    }
  }, [dispatch, monitorType, sleepTokenPayload]);

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    fillShadowGradientTo: 'rgba(146, 163, 253, 1)',
    fillShadowGradientFrom: 'rgba(157, 206, 255, 1)',
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
    color: () => Colors.white,
    labelColor: () => '#A3A3A3',
    strokeWidth: 0,
    barPercentage: 0.8,
    barRadius: 10,
    decimalPlaces: 0,
    propsForBackgroundLines: {
      stroke: '#F0F0F0',
      strokeDasharray: '',
    },
    propsForLabels: {
      fontSize: 8,
    },
  };
  return (
    <View style={styles.container}>
      <CustomNavbar
        hasBorder={false}
        leftBtnImage={Images.backIconBlack}
        title={`Monitor ${monitorType}`}
        leftBtnPress={() => navigate.goBack()}
      />

      <View style={styles.chartParent}>
        <View style={styles.totalParent}>
          <Text color={Colors.black} type={Fonts.type.base}>
            {monitorType === MONITOR_TYPE.SPO2.monitorType ||
            monitorType === MONITOR_TYPE.BREATHING_RATE.monitorType
              ? 'Avg'
              : 'Total'}
          </Text>
          <Text
            color={Colors.black}
            type={Fonts.type.base}
            style={{color: 'rgba(29, 27, 37, 0.5)'}}>
            <Text
              color={Colors.black}
              type={Fonts.type.base}
              style={styles.measurementText}>
              {parseFloat(total.toFixed(2)) || 0}
            </Text>{' '}
            {measurement}
          </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {loading ? (
            <View
              style={[
                AppStyles.centerInner,
                {
                  width: Dimensions.get('screen').width - 40,
                },
              ]}>
              <ActivityIndicator
                size={'large'}
                color={'rgba(171, 57, 218, 0.5)'}
              />
            </View>
          ) : (
            <BarChart
              style={styles.barChart}
              data={data}
              width={Dimensions.get('screen').width - 40}
              height={200}
              segments={2}
              withInnerLines={false}
              chartConfig={chartConfig}
              withHorizontalLabels={true}
              fromZero
            />
          )}
        </ScrollView>
      </View>
      <View style={styles.listParent}>
        <Text color={Colors.black} type={Fonts.type.base}>
          Latest Activity
        </Text>
        <FlatList
          data={listData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View style={styles.fltListView1}>
                <View style={styles.fltListView2} />
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text
                    color={Colors.black}
                    type={Fonts.type.base}
                    style={{fontSize: 12, fontWeight: '500'}}>
                    {item.data} {measurement}
                  </Text>
                  <Text
                    color={Colors.black}
                    type={Fonts.type.base}
                    style={styles.timeText}>
                    {item.time}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

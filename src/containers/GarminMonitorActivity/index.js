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
  getGarminSleepRangeDataRequest,
  getGarminDailyRangeDataRequest,
  getGarminSpo2RangeDataRequest,
  getGarminBrRangeDataRequest,
} from '../../redux/slicers/user';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  GET_GARMIN_BR_DATA,
  GET_GARMIN_DAILY_DATA,
  GET_GARMIN_SLEEP_DATA,
  GET_GARMIN_SPO2_DATA,
} from '../../config/WebService';
import {Oauth1Helper} from '../../hooks/oauth';
import {convetStringToObject} from '../../util';

export default function GarminMonitorActivity({route}) {
  const {monitorType, measurement} = route.params;
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.data?.user);

  const fitbitToken = user?.fitbit?.token;
  const sleepTokenPayload = {
    token: fitbitToken,
  };

  const garminToken = {
    key: user?.garmin?.token_key,
    secret: user?.garmin?.token_secret,
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

  const manipulateSleepData = finalResponse => {
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

    for (const res of finalResponse) {
      const {params, response} = res;
      const element = response?.[0];

      graphDaysLabels.push(moment(params?.dayStartText).format('ddd'));
      graphDaysData.push(parseInt(element?.durationInSeconds / 60));
      tempListData.push({
        data: element?.durationInSeconds
          ? parseInt(element?.durationInSeconds / 60)
          : 0,
        time: moment(params?.dayStartText).fromNow(true),
      });
    }

    graphData.labels = graphDaysLabels.reverse();
    graphData.datasets[0].data = graphDaysData.reverse();

    setTotal(graphDaysData.reduce((a, b) => a + b, 0) / 60);
    setData(graphData);
    setListData(tempListData);
  };

  const manipulateDailyData = finalResponse => {
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

    for (const res of finalResponse) {
      const {params, response} = res;
      const element = response?.[0];

      graphDaysLabels.push(moment(params?.dayStartText).format('ddd'));
      graphDaysData.push(element?.bmrKilocalories ?? 0);
      tempListData.push({
        data: element?.bmrKilocalories ?? 0,
        time: moment(params?.dayStartText).fromNow(true),
      });
    }

    graphData.labels = graphDaysLabels.reverse();
    graphData.datasets[0].data = graphDaysData.reverse();

    setTotal([...graphDaysData].reduce((a, b) => a + b, 0));
    setData(graphData);
    setListData(tempListData);
  };

  const manipulateStepData = finalResponse => {
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

    for (const res of finalResponse) {
      const {params, response} = res;
      const element = response?.[0];

      graphDaysLabels.push(moment(params?.dayStartText).format('ddd'));
      graphDaysData.push(element?.steps ?? 0);
      tempListData.push({
        data: element?.steps ?? 0,
        time: moment(params?.dayStartText).fromNow(true),
      });
    }

    graphData.labels = graphDaysLabels.reverse();
    graphData.datasets[0].data = graphDaysData.reverse();

    setTotal([...graphDaysData].reduce((a, b) => a + b, 0));
    setData(graphData);
    setListData(tempListData);
  };

  const manipulateSpo2Data = finalResponse => {
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

    for (const res of finalResponse) {
      const {params, response} = res;
      const element = response?.[0];

      const dataObj = convetStringToObject(element?.timeOffsetSpo2Values) ?? {};
      console.log({dataObj});
      const values = Object.values(dataObj);
      const average = values.reduce((a, b) => a + b, 0) / values.length;

      const averageRoundOf = average
        ? parseFloat(average?.toFixed(2))
        : average;

      graphDaysLabels.push(moment(params?.dayStartText).format('ddd'));
      graphDaysData.push(averageRoundOf ?? 0);
      tempListData.push({
        data: averageRoundOf ?? 0,
        time: moment(params?.dayStartText).fromNow(true),
      });
    }

    graphData.labels = graphDaysLabels.reverse();
    graphData.datasets[0].data = graphDaysData.reverse();

    setTotal([...graphDaysData].reduce((a, b) => a + b, 0));
    setData(graphData);
    setListData(tempListData);
  };

  const manipulateBrData = finalResponse => {
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

    for (const res of finalResponse) {
      const {params, response} = res;
      const element = response?.[0];

      const dataObj =
        convetStringToObject(element?.timeOffsetEpochToBreaths) ?? {};
      console.log({dataObj});
      const values = Object.values(dataObj);
      const average = values.reduce((a, b) => a + b, 0) / values.length;

      const averageRoundOf = average
        ? parseFloat(average?.toFixed(2))
        : average;

      graphDaysLabels.push(moment(params?.dayStartText).format('ddd'));
      graphDaysData.push(averageRoundOf ?? 0);
      tempListData.push({
        data: averageRoundOf ?? 0,
        time: moment(params?.dayStartText).fromNow(true),
      });
    }

    graphData.labels = graphDaysLabels.reverse();
    graphData.datasets[0].data = graphDaysData.reverse();

    setTotal([...graphDaysData].reduce((a, b) => a + b, 0));
    setData(graphData);
    setListData(tempListData);
  };

  useMemo(() => {
    const today = moment().local().isoWeekday();
    const payload = [];

    for (let i = 0; i < today; i++) {
      const dayStart = parseInt(
        new Date(
          moment().local().subtract(i, 'days').format('YYYY-MM-DD') +
            'T00:00:00',
        ).getTime() / 1000,
      );
      const dayEnd = parseInt(
        new Date(
          moment()
            .local()
            .subtract(i, 'days')
            .add(1, 'day')
            .format('YYYY-MM-DD') + 'T00:00:00',
        ).getTime() / 1000,
      );

      const dayStartText = moment()
        .local()
        .subtract(i, 'days')
        .format('YYYY-MM-DD');

      const dayEndText = moment()
        .local()
        .subtract(i, 'days')
        .add(1, 'day')
        .format('YYYY-MM-DD');

      payload.push({
        uploadStartTimeInSeconds: dayStart,
        uploadEndTimeInSeconds: dayEnd,
        dayStartText,
        dayEndText,
      });
    }

    if (!payload.length) {
      setLoading(false);
      navigate.goBack();
      return;
    }

    switch (monitorType) {
      case MONITOR_TYPE.SLEEP.monitorType:
        console.log({payload});

        if (payload?.length > 0) {
          const finalResponse = [];
          const finalResponseNoData = [];

          for (let sleepData of payload) {
            const requestUrl = {
              ...GET_GARMIN_SLEEP_DATA,
              url: `${GET_GARMIN_SLEEP_DATA?.url}?uploadStartTimeInSeconds=${sleepData.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${sleepData?.uploadEndTimeInSeconds}`,
            };

            const headers = Oauth1Helper.getAuthHeaderForRequest(
              requestUrl,
              garminToken,
            );

            dispatch(
              getGarminSleepRangeDataRequest({
                payloadData: {
                  headers,
                  params: {
                    ...sleepData,
                  },
                },

                responseCallback: (status, res) => {
                  const {params, response} = res;
                  if (status) {
                    console.log('response sleep range ---->>>', {
                      params,
                      response,
                    });

                    finalResponse.push({...res});
                  } else {
                    finalResponseNoData.push({...res});
                  }
                  const findIsLastItem = payload?.findIndex(
                    item => item?.dayEndText === params?.dayEndText,
                  );
                  if (findIsLastItem + 1 === payload?.length) {
                    setLoading(false);
                    if (finalResponse?.length > 0)
                      manipulateSleepData([
                        ...finalResponse,
                        ...finalResponseNoData,
                      ]);
                    else {
                      navigate.goBack();
                    }
                    // setSleepFinalData([...finalResponse]);
                  }

                  console.log({finalResponse});
                },
              }),
            );
          }
        } else {
          setLoading(false);
        }

        break;
      case MONITOR_TYPE.CALORIES.monitorType:
        if (payload?.length > 0) {
          const finalResponse = [];
          const finalResponseNoData = [];

          for (let sleepData of payload) {
            const requestUrl = {
              ...GET_GARMIN_DAILY_DATA,
              url: `${GET_GARMIN_DAILY_DATA?.url}?uploadStartTimeInSeconds=${sleepData.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${sleepData?.uploadEndTimeInSeconds}`,
            };

            const headers = Oauth1Helper.getAuthHeaderForRequest(
              requestUrl,
              garminToken,
            );

            dispatch(
              getGarminDailyRangeDataRequest({
                payloadData: {
                  headers,
                  params: {
                    ...sleepData,
                  },
                },

                responseCallback: (status, res) => {
                  const {params, response} = res;
                  if (status) {
                    console.log('response daily range ---->>>', {
                      params,
                      response,
                    });

                    finalResponse.push({...res});
                  } else {
                    finalResponseNoData.push({...res});
                  }
                  const findIsLastItem = payload?.findIndex(
                    item => item?.dayEndText === params?.dayEndText,
                  );
                  if (findIsLastItem + 1 === payload?.length) {
                    setLoading(false);
                    if (finalResponse?.length > 0)
                      manipulateDailyData([
                        ...finalResponse,
                        ...finalResponseNoData,
                      ]);
                    else {
                      navigate.goBack();
                    }
                    // setSleepFinalData([...finalResponse]);
                  }

                  console.log({finalResponse});
                },
              }),
            );
          }
        } else {
          setLoading(false);
        }
        // dispatch(
        //   getActivityRangeRequest({
        //     payloadData: {...sleepTokenPayload, ...{resource: 'calories'}},
        //     responseCallback: (status, respData) => {
        //       setLoading(false);
        //       if (status) {
        //         const tempListData = [];
        //         const graphDaysLabels = [];
        //         const graphDaysData = [];
        //         const graphData = {
        //           labels: [],
        //           datasets: [
        //             {
        //               data: [],
        //             },
        //           ],
        //         };
        //         respData['activities-calories']?.forEach(element => {
        //           graphDaysLabels.push(moment(element.dateTime).format('ddd'));
        //           graphDaysData.push(element.value);
        //           tempListData.push({
        //             data: element.value,
        //             time: moment(element.dateTime).fromNow(true),
        //           });
        //         });
        //         graphData.labels = graphDaysLabels;
        //         graphData.datasets[0].data = graphDaysData;
        //         setTotal(
        //           graphDaysData.reduce(
        // (a, b) => parseInt(a, 10) + parseInt(b, 10),
        // 0,
        //           ),
        //         );
        //         setData(graphData);
        //         setListData(tempListData.reverse());
        //       } else {
        //         navigate.goBack();
        //       }
        //     },
        //   }),
        // );
        break;
      case MONITOR_TYPE.STEPS.monitorType:
        if (payload?.length > 0) {
          const finalResponse = [];
          const finalResponseNoData = [];

          for (let sleepData of payload) {
            const requestUrl = {
              ...GET_GARMIN_DAILY_DATA,
              url: `${GET_GARMIN_DAILY_DATA?.url}?uploadStartTimeInSeconds=${sleepData.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${sleepData?.uploadEndTimeInSeconds}`,
            };

            const headers = Oauth1Helper.getAuthHeaderForRequest(
              requestUrl,
              garminToken,
            );

            dispatch(
              getGarminDailyRangeDataRequest({
                payloadData: {
                  headers,
                  params: {
                    ...sleepData,
                  },
                },

                responseCallback: (status, res) => {
                  const {params, response} = res;
                  if (status) {
                    console.log('response steps range ---->>>', {
                      params,
                      response,
                    });

                    finalResponse.push({...res});
                  } else {
                    finalResponseNoData.push({...res});
                  }
                  const findIsLastItem = payload?.findIndex(
                    item => item?.dayEndText === params?.dayEndText,
                  );
                  if (findIsLastItem + 1 === payload?.length) {
                    setLoading(false);
                    if (finalResponse?.length > 0)
                      manipulateStepData([
                        ...finalResponse,
                        ...finalResponseNoData,
                      ]);
                    else {
                      navigate.goBack();
                    }
                  }

                  console.log({finalResponse});
                },
              }),
            );
          }
        } else {
          setLoading(false);
        }
        // dispatch(
        //   getActivityRangeRequest({
        //     payloadData: {...sleepTokenPayload, ...{resource: 'steps'}},
        //     responseCallback: (status, respData) => {
        //       setLoading(false);
        //       if (status) {
        //         const tempListData = [];
        //         const graphDaysLabels = [];
        //         const graphDaysData = [];
        //         const graphData = {
        //           labels: [],
        //           datasets: [
        //             {
        //               data: [],
        //             },
        //           ],
        //         };
        //         respData['activities-steps']?.forEach(element => {
        //           graphDaysLabels.push(moment(element.dateTime).format('ddd'));
        //           graphDaysData.push(element.value);
        //           tempListData.push({
        //             data: element.value,
        //             time: moment(element.dateTime).fromNow(true),
        //           });
        //         });
        //         graphData.labels = graphDaysLabels;
        //         graphData.datasets[0].data = graphDaysData;
        //         setTotal(
        //           graphDaysData.reduce(
        //             (a, b) => parseInt(a, 10) + parseInt(b, 10),
        //             0,
        //           ),
        //         );
        //         setData(graphData);
        //         setListData(tempListData.reverse());
        //       } else {
        //         navigate.goBack();
        //       }
        //     },
        //   }),
        // );
        break;
      case MONITOR_TYPE.SPO2.monitorType:
        if (payload?.length > 0) {
          const finalResponse = [];
          const finalResponseNoData = [];

          for (let sleepData of payload) {
            const requestUrl = {
              ...GET_GARMIN_SPO2_DATA,
              url: `${GET_GARMIN_SPO2_DATA?.url}?uploadStartTimeInSeconds=${sleepData.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${sleepData?.uploadEndTimeInSeconds}`,
            };

            const headers = Oauth1Helper.getAuthHeaderForRequest(
              requestUrl,
              garminToken,
            );

            dispatch(
              getGarminSpo2RangeDataRequest({
                payloadData: {
                  headers,
                  params: {
                    ...sleepData,
                  },
                },

                responseCallback: (status, res) => {
                  const {params, response} = res;
                  if (status) {
                    console.log('response spo2 range ---->>>', {
                      params,
                      response,
                    });

                    finalResponse.push({...res});
                  } else {
                    finalResponseNoData.push({...res});
                  }
                  const findIsLastItem = payload?.findIndex(
                    item => item?.dayEndText === params?.dayEndText,
                  );
                  if (findIsLastItem + 1 === payload?.length) {
                    setLoading(false);
                    if (finalResponse?.length > 0)
                      manipulateSpo2Data([
                        ...finalResponse,
                        ...finalResponseNoData,
                      ]);
                    else {
                      navigate.goBack();
                    }
                  }

                  console.log({finalResponse});
                },
              }),
            );
          }
        } else {
          setLoading(false);
        }
        // dispatch(
        //   getSPO2RangeDataRequest({
        //     payloadData: sleepTokenPayload,
        //     responseCallback: (status, respData) => {
        //       setLoading(false);
        //       if (status) {
        //         const tempListData = [];
        //         const graphDaysLabels = [];
        //         const graphDaysData = [];
        //         const graphData = {
        //           labels: [],
        //           datasets: [
        //             {
        //               data: [],
        //             },
        //           ],
        //         };
        //         respData.forEach(element => {
        //           graphDaysLabels.push(moment(element.dateTime).format('ddd'));
        //           graphDaysData.push(element.value.avg);
        //           tempListData.push({
        //             data: element.value.avg,
        //             time: moment(element.dateTime).fromNow(true),
        //           });
        //         });
        //         graphData.labels = graphDaysLabels;
        //         graphData.datasets[0].data = graphDaysData;
        //         setTotal(
        //           graphDaysData.reduce(
        //             (a, b) => parseInt(a, 10) + parseInt(b, 10),
        //             0,
        //           ) / graphDaysData.length,
        //         );
        //         setData(graphData);
        //         setListData(tempListData.reverse());
        //       } else {
        //         navigate.goBack();
        //       }
        //     },
        //   }),
        // );
        break;
      case MONITOR_TYPE.BREATHING_RATE.monitorType:
        if (payload?.length > 0) {
          const finalResponse = [];
          const finalResponseNoData = [];

          for (let sleepData of payload) {
            const requestUrl = {
              ...GET_GARMIN_BR_DATA,
              url: `${GET_GARMIN_BR_DATA?.url}?uploadStartTimeInSeconds=${sleepData.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${sleepData?.uploadEndTimeInSeconds}`,
            };

            const headers = Oauth1Helper.getAuthHeaderForRequest(
              requestUrl,
              garminToken,
            );

            dispatch(
              getGarminBrRangeDataRequest({
                payloadData: {
                  headers,
                  params: {
                    ...sleepData,
                  },
                },

                responseCallback: (status, res) => {
                  const {params, response} = res;
                  if (status) {
                    console.log('response BR range ---->>>', {
                      params,
                      response,
                    });

                    finalResponse.push({...res});
                  } else {
                    finalResponseNoData.push({...res});
                  }
                  const findIsLastItem = payload?.findIndex(
                    item => item?.dayEndText === params?.dayEndText,
                  );
                  if (findIsLastItem + 1 === payload?.length) {
                    setLoading(false);
                    if (finalResponse?.length > 0)
                      manipulateBrData([
                        ...finalResponse,
                        ...finalResponseNoData,
                      ]);
                    else {
                      navigate.goBack();
                    }
                  }

                  console.log({finalResponse});
                },
              }),
            );
          }
        } else {
          setLoading(false);
        }
        // dispatch(
        //   getBrRangeDataRequest({
        //     payloadData: sleepTokenPayload,
        //     responseCallback: (status, respData) => {
        //       setLoading(false);
        //       if (status) {
        //         const tempListData = [];
        //         const graphDaysLabels = [];
        //         const graphDaysData = [];
        //         const graphData = {
        //           labels: [],
        //           datasets: [
        //             {
        //               data: [],
        //             },
        //           ],
        //         };
        //         respData?.br.forEach(element => {
        //           graphDaysLabels.push(moment(element.dateTime).format('ddd'));
        //           graphDaysData.push(element.value.breathingRate);
        //           tempListData.push({
        //             data: element.value.breathingRate,
        //             time: moment(element.dateTime).fromNow(true),
        //           });
        //         });
        //         graphData.labels = graphDaysLabels;
        //         graphData.datasets[0].data = graphDaysData;
        //         setTotal(
        //           graphDaysData.reduce(
        //             (a, b) => parseInt(a, 10) + parseInt(b, 10),
        //             0,
        //           ) / graphDaysData.length,
        //         );
        //         setData(graphData);
        //         setListData(tempListData.reverse());
        //       } else {
        //         navigate.goBack();
        //       }
        //     },
        //   }),
        // );
        break;
      default:
        break;
    }
  }, []);

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

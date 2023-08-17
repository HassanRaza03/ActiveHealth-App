import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  ButtonView,
  Text,
  CustomNavbar,
  SurveyListItem,
  Button,
} from '../../components';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllSurveysRequest,
  getAllCompletedSurveysRequest,
  removeAllQuestions,
} from '../../redux/slicers/surveyQuestions';
import {getUserGroupsRequest} from '../../redux/slicers/groups';
import {useNavigation} from '@react-navigation/native';

export default function Survey() {
  const nagivate = useNavigation();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [gettingData, setGettingData] = useState(false);
  const [gettingGroups, setGettingGroups] = useState(true);
  const userGroups = useSelector(state => state?.groups?.userGroups);
  const isFocused = useIsFocused();
  const user = useSelector(({user}) => user?.data?.user);
  const surveys = useSelector(state => state?.surveyQuestions?.questions);
  const completedSurveys = useSelector(
    state => state?.surveyQuestions?.completedSurveys,
  );

  // console.log(
  //   'completedSurveyscompletedSurveyscompletedSurveyscompletedSurveys = >',
  //   JSON.stringify(completedSurveys),
  // );

  const getSurveys = () => {
    if (userGroups?.length > 0) {
      const ids = userGroups?.map(item => item?.id);
      setIsLoading(true);

      dispatch(
        getAllSurveysRequest({
          payloadData: {
            groupIds: ids,
            userId: user?.id,
          },
          responseCallback: status => {
            setIsLoading(false);
          },
        }),
      );
    } else {
      dispatch(removeAllQuestions());
    }
  };

  useEffect(() => {
    if (userGroups?.length > 0 && isFocused) {
      const ids = userGroups?.map(item => item?.id);
      setIsLoading(true);
      setGettingData(true);
      setGettingGroups(true);
      dispatch(
        getAllSurveysRequest({
          payloadData: {
            groupIds: ids,
            userId: user?.id,
          },
          responseCallback: () => {
            setIsLoading(false);
            setGettingData(false);
          },
        }),
      );
      // dispatch(
      //   getUserGroupsRequest({
      //     payloadData: {
      //       userId: user?.id,
      //     },
      //     responseCallback: () => {
      //       setGettingGroups(false);
      //       dispatch(
      //         getAllSurveysRequest({
      //           payloadData: {
      //             groupIds: ids,
      //             userId: user?.id,
      //           },
      //           responseCallback: () => {
      //             setIsLoading(false);
      //             setGettingData(false);
      //           },
      //         }),
      //       );
      //     },
      //   }),
      // );
    } else {
      if (userGroups?.length < 0) {
        dispatch(removeAllQuestions());
      }
    }
  }, [dispatch, isFocused, user?.id, userGroups]);

  useEffect(() => {
    if (!isActive) {
      setGettingData(true);
      getCompletedSurveys();
    }
  }, [isActive, dispatch]);

  const getCompletedSurveys = () => {
    setIsLoading(true);

    dispatch(
      getAllCompletedSurveysRequest({
        payloadData: {
          userId: user?.id,
        },
        responseCallback: () => {
          setIsLoading(false);
          setGettingData(false);
        },
      }),
    );
  };
  const after = Object.keys(completedSurveys).sort((a, b) => {
    return new Date(b[0].createdAt) - new Date(a[0].createdAt);
  });

  return (
    <View style={styles.container}>
      <CustomNavbar hasBorder={false} title="Fatigue Monitor" />
      <>
        <View style={styles.viewSelected}>
          <TouchableOpacity
            onPress={() => setIsActive(true)}
            style={[
              styles.selectionView,
              isActive && {backgroundColor: '#AF36DA'},
            ]}>
            <Text
              color={Colors.black}
              type={Fonts.type.base}
              style={[styles.selectedTxt, isActive && {color: Colors.white}]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsActive(false)}
            style={[
              styles.selectionView,
              !isActive && {backgroundColor: '#AF36DA'},
            ]}>
            <Text
              color={Colors.black}
              type={Fonts.type.base}
              style={[styles.selectedTxt, !isActive && {color: Colors.white}]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {isActive && (
          <>
            {userGroups.length < 1 ? (
              <View style={[AppStyles.centerInner, AppStyles.flex]}>
                <View
                  style={{
                    alignSelf: 'center',
                    width: 300,
                    height: 180,
                    borderRadius: 20,
                    backgroundColor: Colors.white,
                    padding: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 1.0,

                    elevation: 1,
                  }}>
                  <Text
                    color={Colors.black}
                    type={Fonts.type.base}
                    style={{
                      color: Colors.black,
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: '600',
                    }}>
                    Select Groups
                  </Text>
                  <Text
                    color={Colors.black}
                    type={Fonts.type.base}
                    style={{
                      color: Colors.black,
                      textAlign: 'center',
                      fontSize: 14,
                      fontWeight: '400',
                      marginTop: 20,
                      width: '70%',
                    }}>
                    Select your Group to start the survey process
                  </Text>
                  <Button
                    onPress={() => {
                      nagivate.navigate('editProfileSurvey');
                    }}
                    type={Fonts.type.base}
                    style={styles.button}
                    textStyle={styles.YesTxt}>
                    EDIT GROUPS
                  </Button>
                </View>
              </View>
            ) : (
              <>
                {!gettingData ? (
                  <FlatList
                    data={[...surveys]}
                    onRefresh={getSurveys}
                    refreshing={isLoading}
                    refreshControl={
                      <RefreshControl
                        refreshing={isLoading}
                        onRefresh={getSurveys}
                        tintColor={'#AF36DA'}
                      />
                    }
                    contentContainerStyle={{paddingBottom: 20}}
                    ListEmptyComponent={() => {
                      return (
                        <View
                          style={{
                            marginTop: 40,
                          }}>
                          <Text>No surveys found</Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={item => {
                      return <SurveyListItem item={item} isActive={isActive} />;
                    }}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,

                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator color={'#AF36DA'} size={'large'} />
                  </View>
                )}
              </>
            )}
          </>
        )}
        {!isActive && (
          <>
            {!gettingData ? (
              <FlatList
                data={completedSurveys}
                onRefresh={getCompletedSurveys}
                refreshing={isLoading}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={getCompletedSurveys}
                    tintColor={'#AF36DA'}
                  />
                }
                contentContainerStyle={{paddingBottom: 40}}
                ListEmptyComponent={() => {
                  return (
                    <View style={{marginTop: 20}}>
                      <Text>No surveys found</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  return <SurveyListItem item={item} isActive={false} />;
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,

                  justifyContent: 'center',
                }}>
                <ActivityIndicator color={'#AF36DA'} size={'large'} />
              </View>
            )}
          </>
        )}
      </>
    </View>
  );
}

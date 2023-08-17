/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import _ from 'lodash';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Image, View, StatusBar} from 'react-native';
import {
  homeWithoutTabbar,
  profileWithoutTabbar,
  surveyWithoutTabbar,
} from '../../constants';
import {
  ChangePassword,
  ConnectWatch,
  EditProfile,
  Home,
  IndividualSurvey,
  MonitorActivity,
  Profile,
  ViewSurvery,
  CompleteSurveyList,
  GarminMonitorActivity,
} from '../../containers';
import Notification from '../../containers/notification';
import Survey from '../../containers/Survey';
import {Colors, Images} from '../../theme';
import util from '../../util';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllGroupsRequest,
  getUserGroupsRequest,
} from '../../redux/slicers/groups';

const HomeNavigate = ({navigation, route}) => {
  const Stack = createStackNavigator();
  const BottomTab = createBottomTabNavigator();
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const user = useSelector(({user}) => user?.data?.user);

  useEffect(() => {
    dispatch(
      getUserGroupsRequest({
        payloadData: {
          user: user?.id,
        },
      }),
    );

    dispatch(getAllGroupsRequest({responseCallback: () => {}}));
  }, []);

  useEffect(() => {
    if (_.isEmpty(user)) {
      navigate('login');
    }
  }, [user]);

  return (
    <BottomTab.Navigator
      initialRouteName={'home'}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.white,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
        },
      }}>
      <BottomTab.Screen
        name="survey"
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            display: surveyWithoutTabbar?.includes(
              getFocusedRouteNameFromRoute(route),
            )
              ? 'none'
              : 'flex',
          },
          tabBarIcon: ({focused}) => (
            <View
              style={[
                {
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                },
                focused && {
                  borderTopColor: Colors.background.primary,
                  borderTopWidth: 3,
                },
              ]}>
              <Image
                source={
                  focused
                    ? Images.SelectSurveyIcon
                    : Images.unSelectedSurveyIcon
                }
              />
            </View>
          ),
        })}>
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="survey"
              component={Survey}
            />
            <Stack.Screen
              options={() => ({
                headerShown: false,
                gestureEnabled: false,
              })}
              name="individualSurvey"
              component={IndividualSurvey}
            />
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="viewSurvery"
              component={ViewSurvery}
            />
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="completeSurveyList"
              component={CompleteSurveyList}
            />
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="editProfileSurvey"
              component={EditProfile}
            />
          </Stack.Navigator>
        )}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="home"
        options={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            display: homeWithoutTabbar?.includes(
              getFocusedRouteNameFromRoute(route),
            )
              ? 'none'
              : 'flex',
          },
          tabBarIcon: ({focused}) => (
            <View
              style={[
                {
                  width: 40,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                focused && {
                  borderTopColor: Colors.background.primary,
                  borderTopWidth: 3,
                },
              ]}>
              <Image
                source={
                  focused ? Images.SelectHomeIcon : Images.unSelectedHomeIcon
                }
              />
            </View>
          ),
        })}>
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="home"
              component={Home}
            />
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="notification"
              component={Notification}
            />
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="individualSurvey"
              component={IndividualSurvey}
            />
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="monitorActivity"
              component={MonitorActivity}
            />
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="garminMonitorActivity"
              component={GarminMonitorActivity}
            />
            <Stack.Screen
              name="connectWatch"
              component={ConnectWatch}
              options={{
                headerShown: false,
                width: '100%',
              }}
            />
          </Stack.Navigator>
        )}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="profile"
        options={({route}) => ({
          tabBarStyle: {
            display: profileWithoutTabbar?.includes(
              getFocusedRouteNameFromRoute(route),
            )
              ? 'none'
              : 'flex',
          },
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={[
                {
                  width: 40,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                focused && {
                  borderTopColor: Colors.background.primary,
                  borderTopWidth: 3,
                },
              ]}>
              <Image
                source={
                  focused
                    ? Images.selectedPersonalIcon
                    : Images.unSelectedPersonalIcon
                }
              />
            </View>
          ),
        })}>
        {() => (
          <Stack.Navigator>
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="profile"
              component={Profile}
            />
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="editProfile"
              component={EditProfile}
            />
            <Stack.Screen
              options={() => ({
                headerShown: false,
              })}
              name="changePassword"
              component={ChangePassword}
            />
          </Stack.Navigator>
        )}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
};

export default HomeNavigate;

import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import _ from 'lodash';
// import {Notifications} from 'react-native-notifications';
import {Actions} from 'react-native-router-flux';
import {
  NOTIFICATIONS,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PERMISSION_DENIED_ERROR,
} from '../constants';
import DataHandler from '../services/DataHandler';
import util from '../util';
import {manipulateNotification} from './notifications';
import {
  notificationTokenRequest,
  removeDeviceTokenRequest,
} from '../redux/slicers/gerenal';
import {useNavigation} from '@react-navigation/native';

const LOG = false;
const getPermissions = async () => {
  let authStatus = messaging().hasPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (!enabled) {
    try {
      authStatus = await messaging().requestPermission();
    } catch (error) {
      util.topAlert(NOTIFICATION_PERMISSION_DENIED_ERROR);
    }
  }

  if (enabled) {
  }
};
const updateDeviceToken = async () => {
  let fcmToken = '';

  fcmToken = await messaging().getToken();

  const userData = DataHandler.getStore().getState().user.data.user;

  if (fcmToken?.trim()) {
    // DataHandler.getStore().dispatch(
    //   deviceNotificationTokenRequest({
    //     device_token: fcmToken,
    //   }),
    // );

    DataHandler.getStore().dispatch(
      notificationTokenRequest({
        payloadData: {
          fcm: fcmToken,
          user: userData?.id,
        },
        responseCallback: () => {},
      }),
    );
  }

  return fcmToken;
};

export const deleteDeviceToken = async () => {
  let fcmToken = '';

  fcmToken = await messaging().getToken();

  const userData = DataHandler.getStore().getState().user.data.user;

  if (fcmToken && userData?.id) {
    // DataHandler.getStore().dispatch(
    //   deviceNotificationTokenRequest({
    //     device_token: fcmToken,
    //   }),
    // );

    DataHandler.getStore().dispatch(
      removeDeviceTokenRequest({
        payloadData: {
          fcm: fcmToken,
          userId: userData?.id,
        },
        responseCallback: () => {},
      }),
    );
  }

  return fcmToken;
};

const setChannelForAndroid = async () => {
  // await Notifications.setNotificationChannel({
  //   channelId: NOTIFICATION_CHANNEL.id,
  //   name: NOTIFICATION_CHANNEL.name,
  //   importance: 5,
  //   description: NOTIFICATION_CHANNEL.name,
  //   enableLights: true,
  //   enableVibration: true,
  //   // lightColor: 'blue',
  //   // showBadge: false,
  //   // soundFile: 'default',
  // });
};

const showLocalNotification = async (data, navigate) => {
  const {
    notification_title,
    body,
    type,
    notification_message,
    notification_images,
    notification_time,
    id,
    notification_room_id,
    notification_flight_number,
    silent,
    notification_trip_id,
    date,
    extra_data,
    title,
  } = data;
  if (silent === 'true') {
    navigateOnNotificationTap(data, navigate);
    return true;
  } else {
    const someId = Math.floor(Math.random() * 10) + '';

    // Notifications.postLocalNotification({
    //   title,
    //   sound: 'default',
    //   silent: false,
    //   data: {isLocal: true, id: someId, sound: 'default', type},
    //   type,
    //   body: body,
    // });
  }
};

const clearAllNotifications = () => {
  //firebase.notifications().removeAllDeliveredNotifications();
};

// const clearBadgeNumber = () => {
//   if (!Util.isPlatformAndroid()) firebase.notifications().setBadge(0);
// };
const navigateOnNotificationTap = (data, navigate) => {
  navigate.navigate('individualSurvey', {
    notificationId: data?.notificationId,
    surveyId: data?.surveyId,
  });
};

export {
  navigateOnNotificationTap,
  updateDeviceToken,
  getPermissions,
  showLocalNotification,
  setChannelForAndroid,
};

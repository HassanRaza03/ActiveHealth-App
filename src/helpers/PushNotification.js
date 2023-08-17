import messaging from '@react-native-firebase/messaging';
import DataHandler from '../services/DataHandler';
import {notificationTokenRequest} from '../redux/slicers/gerenal';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    updateDeviceToken();
  }
}
const updateDeviceToken = async () => {
  let fcmToken = '';

  fcmToken = await messaging().getToken();

  const userData = DataHandler.getStore().getState().user.data.user;
  console.log({fcmTokenfcmToken: fcmToken});
  if (fcmToken?.trim()) {
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

export const notificationSerivces = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
    console.log({remoteMessageremoteMessage: remoteMessage});
  });

  /// foreground massage handling

  // messaging().onMessage(async remoteMassage => {
  //   console.log('remoteMassage', remoteMassage);
  // });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      setLoading(false);
    });
};

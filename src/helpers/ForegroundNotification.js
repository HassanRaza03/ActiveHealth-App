import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import util from '../util';
import DataHandler from '../services/DataHandler';
export default ForegroundHander = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {data} = remoteMessage || {};
      console.log({remoteMessage});
      const {notificationId, text, title, surveyId} = data || {};
      if (util.isPlatformAndroid()) {
        PushNotification.createChannel({
          channelId: 'com.activeHealth',
          channelName: 'ActiveHealth',
          importance: 4,
          vibrate: true,
          importance: Importance.HIGH,
        });
        PushNotification.localNotification({
          channelId: 'com.activeHealth',
          title: title,
          body: text,
          message: title,
          vibrate: true,
          playSound: true,
          soundName: 'default',
          id: notificationId,
          massageId: notificationId,
          priority: 'high',
        });
      } else {
        PushNotificationIOS.addNotificationRequest({
          body: text,
          message: title,
          vibrate: true,
          playSound: true,
          soundName: 'default',
          id: notificationId,
          massageId: notificationId,
          userInfo: data,
        });
      }

      return unsubscribe;
    });
  }, []);
  return null;
};

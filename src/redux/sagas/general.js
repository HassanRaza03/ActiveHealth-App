import _ from 'lodash';
import {take, fork, call, put} from 'redux-saga/effects';
import {
  uploadFileRequest,
  notificationTokenRequest,
  notificationsListRequest,
  notificationsListSucces,
  notificationsUpdateRequest,
  notificationsUpdateSuccess,
  removeDeviceTokenRequest,
  getNotificationCountRequest,
  getNotificationCountSuccess,
  getNotificationClearRequest,
  getNotificationClearSuccess,
  getNotificationReadCountSuccess,
  getNotificationReadCountRequest,
} from '../slicers/gerenal';
import {
  COURT_NOTIFICATION_READ,
  CREATE_GARMIN_USER,
  ClEAR_NOTIFICATION_COUNT,
  DELETE_DEVICE_TOKEN,
  ERROR_SOMETHING_WENT_WRONG,
  GARMIN_BASE_URL,
  GET_GARMIN_USER_INFO,
  GET_NOTIFICATION,
  GET_NOTIFICATION_COUNT,
  TOKEN_NOTIFICATION,
  UPDATE_NOTIFICATION,
  UPLOAD_FILE,
  callRequest,
} from '../../config/WebService';
import ApiSauce from '../../services/ApiSauce';
import {SAGA_ALERT_TIMEOUT} from '../../constants';
import util from '../../util';
import {
  createGarminUserRequest,
  createGarminUserSuccess,
  getGarminUserInfoRequest,
  testingRequest,
} from '../slicers/user';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}
function* uploadFile() {
  while (true) {
    const {payload} = yield take(uploadFileRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        UPLOAD_FILE,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response) {
        responseCallback && responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('Upload file error: ', err);
    }
  }
}
function* notificationToken() {
  while (true) {
    const {payload} = yield take(notificationTokenRequest.type);
    const {payloadData, responseCallback} = payload;
    console.log({payloadData});
    try {
      const response = yield call(
        callRequest,
        TOKEN_NOTIFICATION,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log({tokennRes: response});
      if (response) {
        responseCallback && responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('Notification: ', err);
    }
  }
}
function* notificationGet() {
  while (true) {
    const {payload} = yield take(notificationsListRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_NOTIFICATION,
        '',
        '',
        {},
        `pagination[limit]=50000&sort[0]=createdAt%3Adesc&filters[user][id][$eq]=${payloadData?.userId}&populate=*`,
        ApiSauce,
      );
      if (response) {
        console.log({response});
        yield put(notificationsListSucces(response));
        responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('notificationGet error: ', err);
    }
  }
}
function* notificationUpdate() {
  while (true) {
    const {payload} = yield take(notificationsUpdateRequest.type);
    const {payloadData, responseCallback} = payload;
    const {notificationId, isRead} = payloadData;
    const url = {
      ...UPDATE_NOTIFICATION,
      route: UPDATE_NOTIFICATION?.route?.replace(':id', notificationId),
    };
    console.log({url});
    try {
      const response = yield call(
        callRequest,
        url,
        {
          data: {
            isRead: isRead,
          },
        },
        '',
        {},
        '',
        ApiSauce,
      );
      console.log({responseUpdate: response});
      if (response) {
        yield put(notificationsUpdateSuccess(notificationId));
        responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('Notification: ', err);
      console.error(err);
    }
  }
}
function* getNotificationCount() {
  while (true) {
    const {payload} = yield take(getNotificationCountRequest.type);
    const {payloadData, responseCallback} = payload;
    const {userId} = payloadData;
    const url = {
      ...GET_NOTIFICATION_COUNT,
      route: GET_NOTIFICATION_COUNT?.route?.replace(':userId', userId),
    };
    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);
      console.log({responseUpdate: response});
      if (response) {
        yield put(getNotificationCountSuccess(response.data.notificationCount));
        responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('Notification: ', err);
      console.error(err);
    }
  }
}
function* getNotificationCountRead() {
  while (true) {
    const {payload} = yield take(getNotificationReadCountRequest.type);
    const {payloadData, responseCallback} = payload;
    const {userId} = payloadData;
    const url = {
      ...COURT_NOTIFICATION_READ,
      route: COURT_NOTIFICATION_READ?.route?.replace(':userId', userId),
    };
    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);
      console.log({responseUpdate: response});
      if (response) {
        responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('Notification: ', err);
      console.error(err);
    }
  }
}
function* clearNotificationCount() {
  while (true) {
    const {payload} = yield take(getNotificationClearRequest.type);
    const {payloadData, responseCallback} = payload;
    const {userId} = payloadData;
    const url = {
      ...ClEAR_NOTIFICATION_COUNT,
      route: ClEAR_NOTIFICATION_COUNT?.route?.replace(':userId', userId),
    };
    try {
      const response = yield call(callRequest, url, {}, '', {}, '', ApiSauce);
      if (response) {
        yield put(getNotificationClearSuccess(response));
        responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('Notification: ', err);
      console.error(err);
    }
  }
}

function* deleteToken() {
  while (true) {
    const {payload} = yield take(removeDeviceTokenRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        DELETE_DEVICE_TOKEN,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      console.log({responseUpdate: response});
      if (response) {
        responseCallback(true, response);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('Notification: ', err);
      console.error(err);
    }
  }
}

export default function* root() {
  yield fork(uploadFile);
  yield fork(notificationToken);
  yield fork(notificationGet);
  yield fork(notificationUpdate);
  yield fork(deleteToken);
  yield fork(getNotificationCount);
  yield fork(clearNotificationCount);
  yield fork(getNotificationCountRead);
}

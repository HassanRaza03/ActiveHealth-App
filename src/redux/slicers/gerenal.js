import {createSlice} from '@reduxjs/toolkit';
import Immutable from 'seamless-immutable';
import util from '../../util';

const CommentsReducer = createSlice({
  name: 'gerenal',
  initialState: {
    isFirst: true,
    notificationList: [],
    notificationCount: 0,
  },
  reducers: {
    setFirstTime(state, action) {
      state.isFirst = action.payload;
    },
    uploadFileRequest() {},
    notificationTokenRequest() {},
    notificationsListRequest() {},
    notificationsListSucces(state, action) {
      state.notificationList = action.payload.data;
      state.notificationCount = 0;
    },
    notificationsUpdateRequest() {},
    notificationsUpdateSuccess(state, action) {
      const notificationId = action?.payload;

      const notificationListClone = [...state.notificationList];

      const findIndex = notificationListClone?.findIndex(
        n => n?.id == notificationId,
      );

      if (findIndex > -1) {
        notificationListClone[findIndex] = {
          ...notificationListClone[findIndex],
          attributes: {
            ...notificationListClone[findIndex]?.attributes,
            isRead: true,
          },
        };

        state.notificationList = [...notificationListClone];
      }
    },

    getNotificationCountRequest() {},
    getNotificationCountSuccess(state, action) {
      state.notificationCount = action.payload;
    },
    getNotificationClearRequest() {},
    getNotificationClearSuccess(state, action) {
      state.notificationCount = 0;
    },
    getNotificationReadCountRequest() {},
    getNotificationReadCountSuccess(state, action) {},
    notificationCountIncrease(state, action) {
      const stateCount = util.cloneDeep(state.notificationCount);
      state.notificationCount = Number(stateCount) + 1;
    },
    notificationCountDecrease(state, action) {
      const stateCount = util.cloneDeep(state.notificationCount);
      state.notificationCount = Number(stateCount) - 1;
    },
    generalLogoutRequest(state) {
      state.notificationList = [];
    },
    removeDeviceTokenRequest() {},
  },
});

export const {
  setFirstTime,
  uploadFileRequest,
  notificationsListRequest,
  notificationTokenRequest,
  notificationsListSucces,
  notificationsUpdateRequest,
  notificationsUpdateSuccess,
  generalLogoutRequest,
  removeDeviceTokenRequest,
  getNotificationCountRequest,
  getNotificationCountSuccess,
  notificationCountIncrease,
  getNotificationClearRequest,
  getNotificationClearSuccess,
  notificationCountDecrease,
  getNotificationReadCountRequest,
  getNotificationReadCountSuccess,
} = CommentsReducer.actions;

export default CommentsReducer.reducer;

import {createSlice} from '@reduxjs/toolkit';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import moment from 'moment';
import {convetStringToObject} from '../../util';

const CommentsReducer = createSlice({
  name: 'user',
  initialState: {
    data: {},
    token: '',
    isSignUp: false,
    fitBitConnected: false,
    garminConnected: false,
    garminData: {},
    fitBitData: {
      // updated: null,
      // sleep: {
      //   sleep_target: 0,
      //   awake: 0,
      //   sleep_value: 0,
      // },
      // br: 0,
      // spo2: 0,
      // calories: {
      //   calories_target: 0,
      //   calories_value: 0,
      // },
      // steps: 0,
    },
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },

    userSignupRequest() {},
    userSignupSuccess(state, action) {
      state.data = action?.payload;
      state.token = action?.payload?.jwt;
    },
    userSigninRequest() {},

    getOtpTokenRequest() {},
    confirmOtpRequest() {},

    resetPasswordRequest() {},
    changePasswordRequest() {},

    updateProfileRequest() {},
    updateProfileSuccess(state, action) {
      state.data.user.full_name = action.payload.fullName;
    },
    getUserDataRequest() {},
    getUserDataSuccess(state, action) {
      console.log('user data =>  ', action?.payload);
      const {fitbit, garmin} = action?.payload;
      let temp = false;
      let tempGarmin = false;
      if (fitbit?.token) {
        temp = true;
      } else {
        state.fitBitData = {
          updated: null,
          sleep: {
            sleep_target: 1000,
            awake: 0,
            sleep_value: 0,
          },
          br: 0,
          spo2: 0,
          calories: {
            calories_target: 1000,
            calories_value: 0,
          },
          steps: 0,
        };
      }

      if (garmin?.token_key && garmin?.token_secret) {
        tempGarmin = true;
      }

      console.log('This is temp now => , ', temp);
      state.fitBitConnected = temp;
      state.garminConnected = tempGarmin;
      state.data.user = action.payload;
    },
    userSignoutRequest(state) {
      state.fitBitConnected = false;
      state.garminConnected = false;
      const initialData = {
        updated: null,
        sleep: {
          sleep_target: 0,
          awake: 0,
          sleep_value: 0,
        },
        br: 0,
        spo2: 0,
        calories: {
          calories_target: 0,
          calories_value: 0,
        },
        steps: 0,
      };

      state.garminData = initialData;
      state.fitBitData = initialData;

      state.data = {};
      state.token = '';
    },
    userSignUp(state, action) {
      state.isSignUp = action.payload;
    },
    getFitbitProfileRequest() {},
    getFitbitProfileSuccess(state, action) {},

    setUserFitBitDataRequest() {},
    setUserFitBitDataSuccess(state, action) {},

    deleteUserFitBitDataRequest() {},
    deleteUserFitBitDataSuccess(state, action) {},

    //fitbit sleepData
    getSleepDataRequest() {},
    getSleepDataSuccess(state, action) {
      console.log('getSleepDataSuccess  action?.payload =>', action?.payload);
      const tempFitBitData = _.cloneDeep(state.fitBitData);
      tempFitBitData.sleep.sleep_value =
        action?.payload?.summary?.totalMinutesAsleep;
      state.fitBitData = tempFitBitData;
    },

    getActivityRangeRequest() {},

    getSleepGoalDataRequest() {},
    getSleepGoalDataSuccess(state, action) {
      const tempFitBitSleepGoalData = _.cloneDeep(state.fitBitData);
      tempFitBitSleepGoalData.sleep.sleep_target =
        action?.payload?.goal?.minDuration;
      state.fitBitData = tempFitBitSleepGoalData;
    },
    getSleepRangeDataRequest() {},
    getSleepRangeDataSuccess() {},

    getAllGoalsActivityRequest() {},
    getAllGoalsActivitySuccess(state, action) {
      const tempFitBitGoalData = _.cloneDeep(state.fitBitData);
      tempFitBitGoalData.calories.calories_target =
        action?.payload?.goals?.caloriesOut;
      tempFitBitGoalData.calories.calories_value =
        action?.payload?.summary?.caloriesOut;
      tempFitBitGoalData.steps = action?.payload?.summary?.steps;
      state.fitBitData = tempFitBitGoalData;
    },

    //SPO2
    getSPO2DataRequest() {},
    getSPO2DataSuccess(state, action) {
      const tempFitBitDataSpo2 = _.cloneDeep(state.fitBitData);
      tempFitBitDataSpo2.spo2 = action?.payload?.value?.avg;
      state.fitBitData = tempFitBitDataSpo2;
    },
    getBrDataRequest() {},
    getBrDataSuccess(state, action) {
      console.log('getBrDataSuccess', JSON.stringify(action));
      const tempFitBitDataBr = _.cloneDeep(state.fitBitData);
      tempFitBitDataBr.br = action?.payload?.br[0]?.value?.breathingRate;
      tempFitBitDataBr.updated = moment();
      state.fitBitData = tempFitBitDataBr;
    },

    getSPO2RangeDataRequest() {},

    getBrRangeDataRequest() {},

    // garmin

    getGarminUserInfoRequest() {},
    getGarminUserInfoSuccess() {},

    getGarminUserPermissionsRequest() {},
    getGarminUserPermissionsSuccess() {},

    createGarminUserRequest() {},
    testingRequest() {},
    createGarminUserSuccess(state, action) {
      state.garminConnected = true;
      state.data.user.garmin = {
        ...action.payload.attributes,
        id: action.payload?.id,
      };
    },

    getGarminDailyDataRequest() {},
    getGarminDailyDataSuccess(state, action) {
      console.log(
        'getGarminDailyDataSuccess action --->>',
        JSON.stringify(action.payload),
      );
      const garminData = {...state.garminData};
      const payload = action?.payload?.[0];
      garminData.steps = payload?.steps ?? 0;
      const calories = {...garminData.calories};
      calories.calories_value = payload?.bmrKilocalories ?? 0;
      calories.calories_target = 2500;
      garminData.calories = calories;

      state.garminData = garminData;
    },

    getGarminSleepDataRequest() {},
    getGarminSleepDataSuccess(state, action) {
      const payload = action.payload?.[0];
      const garminData = {...state.garminData};
      const sleep = {...garminData?.sleep};
      sleep.sleep_value = parseInt(payload?.durationInSeconds / 60);
      sleep.sleep_target = 480;
      garminData.sleep = sleep;
      state.garminData = garminData;
    },

    getGarminBrDataRequest() {},
    getGarminBrDataSuccess(state, action) {
      const payload = action.payload?.[0];
      const garminData = {...state.garminData};

      const dataObj = convetStringToObject(payload?.timeOffsetEpochToBreaths);
      console.log({dataObj});
      const values = Object.values(dataObj);
      const average = values.reduce((a, b) => a + b, 0) / values.length;

      garminData.br = average ? parseFloat(average?.toFixed(2)) : average;
      state.garminData = garminData;
    },

    getGarminSpo2DataRequest() {},
    getGarminSpo2DataSuccess(state, action) {
      const payload = action.payload?.[0];
      const garminData = {...state.garminData};

      const dataObj = convetStringToObject(payload?.timeOffsetSpo2Values);
      console.log({dataObj});
      const values = Object.values(dataObj);
      const average = values.reduce((a, b) => a + b, 0) / values.length;

      garminData.spo2 = average ? parseFloat(average?.toFixed(2)) : average;
      garminData.update = moment();
      state.garminData = garminData;
    },

    deleteGarminUserRequest() {},
    deleteGarminUserSuccess(state) {
      state.garminConnected = false;
      state.data.user.garmin = null;
      state.garminData = {};
    },

    getGarminSleepRangeDataRequest() {},
    getGarminDailyRangeDataRequest() {},
    getGarminBrRangeDataRequest() {},
    getGarminSpo2RangeDataRequest() {},
  },
});

export const {
  setToken,
  // user signout
  userSignoutRequest,
  // signup
  userSignupRequest,
  userSignupSuccess,
  // sign in
  userSigninRequest,
  // get otp
  getOtpTokenRequest,
  confirmOtpRequest,
  // reset password
  resetPasswordRequest,
  // change password
  changePasswordRequest,

  // update profile
  updateProfileRequest,
  updateProfileSuccess,
  //get userdata
  getUserDataRequest,
  getUserDataSuccess,
  userSignUp,
  //fitBit
  getFitbitProfileRequest,
  getFitbitProfileSuccess,

  setUserFitBitDataRequest,
  setUserFitBitDataSuccess,

  deleteUserFitBitDataRequest,
  deleteUserFitBitDataSuccess,

  //sleep
  getSleepDataRequest,
  getSleepDataSuccess,

  getSleepGoalDataRequest,
  getSleepGoalDataSuccess,

  getSleepRangeDataRequest,
  getSleepRangeDataSuccess,

  getAllGoalsActivityRequest,
  getAllGoalsActivitySuccess,

  getSPO2DataRequest,
  getSPO2DataSuccess,

  getActivityRangeRequest,

  getSPO2RangeDataRequest,

  getBrDataRequest,
  getBrDataSuccess,

  getBrRangeDataRequest,

  // garmin
  getGarminUserInfoRequest,
  getGarminUserInfoSuccess,

  createGarminUserRequest,
  createGarminUserSuccess,
  testingRequest,

  getGarminDailyDataRequest,
  getGarminDailyDataSuccess,

  getGarminSleepDataRequest,
  getGarminSleepDataSuccess,

  getGarminBrDataRequest,
  getGarminBrDataSuccess,

  getGarminSpo2DataRequest,
  getGarminSpo2DataSuccess,

  deleteGarminUserRequest,
  deleteGarminUserSuccess,

  getGarminUserPermissionsRequest,
  getGarminUserPermissionsSuccess,

  getGarminSleepRangeDataRequest,
  getGarminBrRangeDataRequest,
  getGarminDailyRangeDataRequest,
  getGarminSpo2RangeDataRequest,
} = CommentsReducer.actions;

export default CommentsReducer.reducer;

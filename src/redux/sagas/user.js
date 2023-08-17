import {take, put, call, fork, takeEvery} from 'redux-saga/effects';
import {
  GARMIN_SAMPLE_BR,
  GARMIN_SAMPLE_DAILY,
  GARMIN_SAMPLE_SLEEP,
  GARMIN_SAMPLE_SPO2,
  SAGA_ALERT_TIMEOUT,
} from '../../constants';
import {
  USER_SIGNUP as USER_SIGNUP_URL,
  USER_SIGNIN,
  callRequest,
  GET_OTP_TOKEN,
  ERROR_SOMETHING_WENT_WRONG,
  CONFIRM_OTP,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  UPDATE_PROFILE,
  GET_USER_INFO,
  GET_FITBIT_PROFILE,
  SET_USER_FITBIT,
  GET_FITBIT_SLEEP_DATA,
  GET_FITBIT_SLEEP_RANGE_DATA,
  GET_FITBIT_SLEEP_GOAL_DATA,
  GET_FITBIT_GOAL_DATA,
  GET_FITBIT_DAILY_ACTIVITY_DATA,
  DELETE_USER_FITBIT,
  GET_FITBIT_ACTIVITY_RANGE_DATA,
  GET_FITBIT_SPO_DATA,
  GET_FITBIT_SPO_RANGE_DATA,
  GET_FITBIT_BR_DATA,
  GET_FITBIT_BR_RANGE_DATA,
  GET_GARMIN_USER_INFO,
  GARMIN_BASE_URL,
  CREATE_GARMIN_USER,
  GET_GARMIN_DAILY_DATA,
  GET_GARMIN_SLEEP_DATA,
  GET_GARMIN_BR_DATA,
  GET_GARMIN_SPO2_DATA,
  DELETE_GARMIN_USER,
  GET_GARMIN_USER_PERMISSIONS,
} from '../../config/WebService';
import ApiSauce from '../../services/ApiSauce';
import Util from '../../util';
import {
  changePasswordRequest,
  confirmOtpRequest,
  getOtpTokenRequest,
  resetPasswordRequest,
  updateProfileRequest,
  updateProfileSuccess,
  userSigninRequest,
  userSignupRequest,
  userSignupSuccess,
  getUserDataRequest,
  getUserDataSuccess,
  getFitbitProfileRequest,
  getFitbitProfileSuccess,
  setUserFitBitDataRequest,
  setUserFitBitDataSuccess,
  deleteUserFitBitDataRequest,
  deleteUserFitBitDataSuccess,
  getSleepDataRequest,
  getSleepDataSuccess,
  getSleepRangeDataRequest,
  getSleepRangeDataSuccess,
  getSleepGoalDataRequest,
  getSleepGoalDataSuccess,
  getAllGoalsActivityRequest,
  getAllGoalsActivitySuccess,
  getSPO2DataRequest,
  getSPO2DataSuccess,
  getActivityRangeRequest,
  getSPO2RangeDataRequest,
  getBrDataRequest,
  getBrDataSuccess,
  getBrRangeDataRequest,
  getGarminUserInfoRequest,
  createGarminUserRequest,
  createGarminUserSuccess,
  getGarminDailyDataRequest,
  getGarminSleepDataRequest,
  getGarminBrDataRequest,
  getGarminSpo2DataRequest,
  getGarminDailyDataSuccess,
  getGarminSleepDataSuccess,
  getGarminBrDataSuccess,
  getGarminSpo2DataSuccess,
  deleteGarminUserRequest,
  deleteGarminUserSuccess,
  getGarminUserPermissionsRequest,
  getGarminSleepRangeDataRequest,
  getGarminDailyRangeDataRequest,
  getGarminSpo2RangeDataRequest,
  getGarminBrRangeDataRequest,
} from '../slicers/user';
import _ from 'lodash';
import moment from 'moment';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* signup() {
  while (true) {
    const {payload} = yield take(userSignupRequest.type);
    const {payloadData, responseCallback} = payload;
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_URL,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response.jwt) {
        if (responseCallback) responseCallback(true, null);
        yield put(userSignupSuccess(response));
      } else {
        if (responseCallback)
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(payloadData, err, err?.error?.details?.errors);
      if (responseCallback) responseCallback(null, err?.error?.message);
    }
  }
}

function* signin() {
  while (true) {
    const {payload} = yield take(userSigninRequest.type);
    const {payloadData, responseCallback} = payload;
    try {
      const response = yield call(
        callRequest,
        USER_SIGNIN,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );
      if (response.jwt) {
        yield put(userSignupSuccess(response));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback)
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err?.error?.message);
      console.log('signin catch =>', err);
    }
  }
}

function* getOtp() {
  while (true) {
    const {payload} = yield take(getOtpTokenRequest?.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_OTP_TOKEN,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.status) {
        responseCallback &&
          responseCallback(true, response?.message, response?.otp);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log(error);
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* confirmOtp() {
  while (true) {
    const {payload} = yield take(confirmOtpRequest?.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        CONFIRM_OTP,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response?.message);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* resetPassword() {
  while (true) {
    const {payload} = yield take(resetPasswordRequest?.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        RESET_PASSWORD,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      console.log({response});

      if (response?.status) {
        responseCallback && responseCallback(true, response?.message);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* changePassword() {
  while (true) {
    const {payload} = yield take(changePasswordRequest?.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        CHANGE_PASSWORD,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.user) {
        responseCallback && responseCallback(true, response?.message);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

function* updateProfile() {
  while (true) {
    const {payload} = yield take(updateProfileRequest?.type);
    const {payloadData, responseCallback} = payload;
    try {
      const response = yield call(
        callRequest,
        UPDATE_PROFILE,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.status) {
        responseCallback && responseCallback(true, response?.message);
        yield put(updateProfileSuccess(payloadData));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.message);
    }
  }
}

function* getUserData() {
  while (true) {
    const {payload} = yield take(getUserDataRequest.type);
    const {responseCallback, payloadData} = payload;
    try {
      const response = yield call(
        callRequest,
        GET_USER_INFO,
        {},
        '',
        {},
        `populate=*`,
        ApiSauce,
      );
      if (response?.groups) {
        responseCallback && responseCallback(true);
        yield put(getUserDataSuccess(response));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('getUserData error =>: ', err);
    }
  }
}
function* setUserFitBitData() {
  while (true) {
    const {payload} = yield take(setUserFitBitDataRequest?.type);
    const {payloadData, responseCallback} = payload;
    try {
      const response = yield call(
        callRequest,
        SET_USER_FITBIT,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response) {
        responseCallback && responseCallback(true, response?.message);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}
function* deleteUserFitBitData() {
  while (true) {
    const {payload} = yield take(deleteUserFitBitDataRequest?.type);
    const {payloadData, responseCallback} = payload;
    try {
      const response = yield call(
        callRequest,
        DELETE_USER_FITBIT,
        {},
        '' + payloadData.fitBitId,
        {},
        '',
        ApiSauce,
      );
      console.log('deleteUserFitBitData response => ', response);
      if (response) {
        responseCallback && responseCallback(true, response?.message);
      } else {
        console.log('deleteUserFitBitData else error');
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (error) {
      console.log({error});
      alert(error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback &&
        responseCallback(
          false,
          error?.error?.message ?? ERROR_SOMETHING_WENT_WRONG.error,
        );
    }
  }
}

//fitbit calls
function* fitBitProfile() {
  while (true) {
    const {payload} = yield take(getFitbitProfileRequest.type);
    const {payloadData, responseCallback} = payload;
    const {token} = payloadData;
    console.log('fitBitProfile => , ', token);
    try {
      const response = yield call(
        callRequest,
        GET_FITBIT_PROFILE,
        {},
        '',
        {authorization: 'Bearer ' + token},
        '',
        ApiSauce,
        'https://api.fitbit.com',
      );
      console.log('fitBitProfile response => , ', response);
      if (response) {
        responseCallback && responseCallback(true, response);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}
function* fitBitSleepGoalData() {
  while (true) {
    const {payload} = yield take(getSleepGoalDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {token} = payloadData;
    try {
      const response = yield call(
        callRequest,
        GET_FITBIT_SLEEP_GOAL_DATA,
        {},
        '',
        {authorization: 'Bearer ' + token},
        '',
        ApiSauce,
        'https://api.fitbit.com',
      );
      console.log(
        '**********fitBitSleepGoalData response********** ',
        response,
      );
      if (response) {
        responseCallback && responseCallback(true, response);
        yield put(getSleepGoalDataSuccess(response));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      alert(ERROR_SOMETHING_WENT_WRONG.error);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}
function* fitBitGoalData() {
  while (true) {
    const {payload} = yield take(getAllGoalsActivityRequest.type);
    const {payloadData, responseCallback} = payload;
    const {token} = payloadData;
    const updateUrl = _.cloneDeep(GET_FITBIT_DAILY_ACTIVITY_DATA);
    updateUrl.route = updateUrl?.route.replace(
      '[date]',
      moment().format('YYYY-MM-DD'),
    );

    try {
      const response = yield call(
        callRequest,
        updateUrl,
        {},
        '',
        {authorization: 'Bearer ' + token},
        '',
        ApiSauce,
        'https://api.fitbit.com',
      );
      console.log('**********fitBitGoalData response********** ', response);
      if (response) {
        responseCallback && responseCallback(true, response);
        yield put(getAllGoalsActivitySuccess(response));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('fitBitGoalData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* fitBitSleepData() {
  while (true) {
    const {payload} = yield take(getSleepDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {token} = payloadData;
    const updateUrl = _.cloneDeep(GET_FITBIT_SLEEP_DATA);
    updateUrl.route = updateUrl?.route.replace(
      '[date]',
      moment().format('YYYY-MM-DD'),
    );
    try {
      const response = yield call(
        callRequest,
        updateUrl,
        {},
        '',
        {authorization: 'Bearer ' + token},
        '',
        ApiSauce,
        'https://api.fitbit.com',
      );
      if (response) {
        responseCallback && responseCallback(true, response);
        yield put(getSleepDataSuccess(response));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('fitBitSleepData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* fitBitSleepRangeData() {
  while (true) {
    const {payload} = yield take(getSleepRangeDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {token} = payloadData;
    const updateUrl = _.cloneDeep(GET_FITBIT_SLEEP_RANGE_DATA);
    updateUrl.route = updateUrl?.route.replace(
      '[startDate]',
      moment().startOf('isoWeek').day(1).format('YYYY-MM-DD'),
    );
    updateUrl.route = updateUrl?.route.replace(
      '[endDate]',
      moment().format('YYYY-MM-DD'),
    );
    console.log('fitBitSleepRangeData updateUrl.route =>> ', updateUrl.route);
    try {
      const response = yield call(
        callRequest,
        updateUrl,
        {},
        '',
        {authorization: 'Bearer ' + token},
        '',
        ApiSauce,
        'https://api.fitbit.com',
      );

      if (response) {
        console.log('fitBitSleepRangeData respppp =>>> ', response);
        responseCallback && responseCallback(true, response);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('fitBitSleepRangeData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}
function* fitBitBrData() {
  while (true) {
    const {payload} = yield take(getBrDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {token} = payloadData;
    const updateUrl = _.cloneDeep(GET_FITBIT_BR_DATA);
    updateUrl.route = updateUrl?.route.replace(
      '[date]',
      moment().format('YYYY-MM-DD'),
    );
    try {
      const response = yield call(
        callRequest,
        updateUrl,
        {},
        '',
        {authorization: 'Bearer ' + token},
        '',
        ApiSauce,
        'https://api.fitbit.com',
      );
      console.log('fitBitBrData response =>', response);
      if (response) {
        responseCallback && responseCallback(true, response);
        yield put(getBrDataSuccess(response));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('fitBitBrData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* fitBitBrRangeData() {
  while (true) {
    const {payload} = yield take(getBrRangeDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {token} = payloadData;
    const updateUrl = _.cloneDeep(GET_FITBIT_BR_RANGE_DATA);
    updateUrl.route = updateUrl?.route.replace(
      '[start-date]',
      moment().startOf('isoWeek').day(1).format('YYYY-MM-DD'),
    );
    updateUrl.route = updateUrl?.route.replace(
      '[end-date]',
      moment().format('YYYY-MM-DD'),
    );
    console.log('fitBitBrRangeData updateUrl.route =>> ', updateUrl.route);
    try {
      const response = yield call(
        callRequest,
        updateUrl,
        {},
        '',
        {authorization: 'Bearer ' + token},
        '',
        ApiSauce,
        'https://api.fitbit.com',
      );

      if (response) {
        console.log('fitBitBrRangeData respppp =>>> ', response);
        responseCallback && responseCallback(true, response);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('fitBitBrRangeData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}
function* fitBitActivityRangeData() {
  while (true) {
    const {payload} = yield take(getActivityRangeRequest.type);
    const {payloadData, responseCallback} = payload;
    const {token, resource} = payloadData;
    const updateUrl = _.cloneDeep(GET_FITBIT_ACTIVITY_RANGE_DATA);
    updateUrl.route = updateUrl?.route.replace('[resource-path]', resource);
    updateUrl.route = updateUrl?.route.replace(
      '[start-date]',
      moment().startOf('isoWeek').day(1).format('YYYY-MM-DD'),
    );
    updateUrl.route = updateUrl?.route.replace(
      '[end-date]',
      moment().format('YYYY-MM-DD'),
    );

    console.log(
      'fitBitActivityRangeData updateUrl.route =>> ',
      updateUrl.route,
    );
    try {
      const response = yield call(
        callRequest,
        updateUrl,
        {},
        '',
        {authorization: 'Bearer ' + token},
        '',
        ApiSauce,
        'https://api.fitbit.com',
      );

      if (response) {
        console.log(
          'fitBitActivityRangeData respppp =>>> ',
          JSON.stringify(response),
        );
        responseCallback && responseCallback(true, response);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('fitBitSleepRangeData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* fitBitSpO2Data() {
  while (true) {
    const {payload} = yield take(getSPO2DataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {token} = payloadData;
    const updateUrl = _.cloneDeep(GET_FITBIT_SPO_DATA);
    updateUrl.route = updateUrl?.route.replace(
      '[date]',
      moment().format('YYYY-MM-DD'),
    );
    try {
      const response = yield call(
        callRequest,
        updateUrl,
        {},
        '',
        {authorization: 'Bearer ' + token},
        '',
        ApiSauce,
        'https://api.fitbit.com',
      );
      console.log('fitBitSpO2Data response => , ', response);
      if (response) {
        responseCallback && responseCallback(true, response);
        yield put(getSPO2DataSuccess(response));
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
        alert(ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('fitBitSpO2Data error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* fitBitSpO2RangeData() {
  while (true) {
    const {payload} = yield take(getSPO2RangeDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {token} = payloadData;
    const updateUrl = _.cloneDeep(GET_FITBIT_SPO_RANGE_DATA);
    updateUrl.route = updateUrl?.route.replace(
      '[start-date]',
      moment().startOf('isoWeek').day(1).format('YYYY-MM-DD'),
    );
    updateUrl.route = updateUrl?.route.replace(
      '[end-date]',
      moment().format('YYYY-MM-DD'),
    );

    console.log('fitBitSpO2RangeData updateUrl.route =>> ', updateUrl.route);
    try {
      const response = yield call(
        callRequest,
        updateUrl,
        {},
        '',
        {authorization: 'Bearer ' + token},
        '',
        ApiSauce,
        'https://api.fitbit.com',
      );

      if (response) {
        console.log(
          'fitBitSpO2RangeData respppp =>>> ',
          JSON.stringify(response),
        );
        responseCallback && responseCallback(true, response);
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('fitBitSleepRangeData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getGarminUserInfo() {
  while (true) {
    const {payload} = yield take(getGarminUserInfoRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers} = payloadData;

    console.log('getGarminUserInfo  =>> ', headers);
    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_USER_INFO,
        {},
        '',
        {...headers},
        '',
        ApiSauce,
        GARMIN_BASE_URL,
      );

      console.log('getGarminUserInfo respppp =>>> ', response);

      if (response) {
        responseCallback && responseCallback(true, response);
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminUserInfo error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getGarminUserPermissions() {
  while (true) {
    const {payload} = yield take(getGarminUserPermissionsRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers} = payloadData;

    console.log('getGarminUserPermissions  =>> ', headers);
    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_USER_PERMISSIONS,
        {},
        '',
        {...headers},
        '',
        ApiSauce,
        GARMIN_BASE_URL,
      );

      console.log('getGarminUserPermissions respppp =>>> ', response);

      if (response) {
        responseCallback && responseCallback(true, response);
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminUserPermissions error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* createGarminUser() {
  while (true) {
    const {payload} = yield take(createGarminUserRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        CREATE_GARMIN_USER,
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.data) {
        console.log('createGarminUser respppp =>>> ', JSON.stringify(response));
        responseCallback && responseCallback(true, response);
        yield put(createGarminUserSuccess(response?.data));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('createGarminUser error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* deleteGarminUser() {
  while (true) {
    const {payload} = yield take(deleteGarminUserRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        DELETE_GARMIN_USER,
        {},
        `${payloadData?.id}`,
        {},
        '',
        ApiSauce,
      );

      if (response?.data) {
        console.log('deleteGarminUser respppp =>>> ', JSON.stringify(response));
        responseCallback && responseCallback(true, response);
        yield put(deleteGarminUserSuccess(response?.data));
      } else {
        alert(ERROR_SOMETHING_WENT_WRONG.error);
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      console.warn('deleteGarminUser error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getGarminDailyData() {
  while (true) {
    const {payload} = yield take(getGarminDailyDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers, params} = payloadData;

    console.log('getGarminDailyData  =>> ', headers);
    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_DAILY_DATA,
        {},
        '',
        {...headers},
        `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
        ApiSauce,
        GARMIN_BASE_URL,
      );

      console.log('getGarminDailyData respppp =>>> ', response);

      if (response?.length) {
        responseCallback && responseCallback(true, response);
        yield put(getGarminDailyDataSuccess(response));
      } else {
        // yield put(getGarminDailyDataSuccess(GARMIN_SAMPLE_DAILY));
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminDailyData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getGarminSleepData() {
  while (true) {
    const {payload} = yield take(getGarminSleepDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers, params} = payloadData;

    console.log('getGarminSleepData  =>> ', headers);
    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_SLEEP_DATA,
        {},
        '',
        {...headers},
        `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
        ApiSauce,
        GARMIN_BASE_URL,
      );

      console.log('getGarminSleepData respppp =>>> ', response);

      if (response?.length) {
        responseCallback && responseCallback(true, response);
        yield put(getGarminSleepDataSuccess(response));
      } else {
        // yield put(getGarminSleepDataSuccess(GARMIN_SAMPLE_SLEEP));

        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminSleepData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getGarminBrData() {
  while (true) {
    const {payload} = yield take(getGarminBrDataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers, params} = payloadData;

    console.log('getGarminBrData  =>> ', headers);
    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_BR_DATA,
        {},
        '',
        {...headers},
        `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
        ApiSauce,
        GARMIN_BASE_URL,
      );

      console.log('getGarminBrData respppp =>>> ', response);

      if (response?.length) {
        responseCallback && responseCallback(true, response);
        yield put(getGarminBrDataSuccess(response));
      } else {
        // yield put(getGarminBrDataSuccess(GARMIN_SAMPLE_BR));
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminBrData error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* getGarminSpo2Data() {
  while (true) {
    const {payload} = yield take(getGarminSpo2DataRequest.type);
    const {payloadData, responseCallback} = payload;
    const {headers, params} = payloadData;

    console.log('getGarminSpo2Data  =>> ', headers);
    try {
      const response = yield call(
        callRequest,
        GET_GARMIN_SPO2_DATA,
        {},
        '',
        {...headers},
        `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
        ApiSauce,
        GARMIN_BASE_URL,
      );

      console.log('getGarminSpo2Data respppp =>>> ', response);

      if (response?.length) {
        responseCallback && responseCallback(true, response);
        yield put(getGarminSpo2DataSuccess(response));
      } else {
        // alert(ERROR_SOMETHING_WENT_WRONG.error);
        // yield put(getGarminSpo2DataSuccess(GARMIN_SAMPLE_SPO2));
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      // console.log(JSON.stringify(err));
      console.warn('getGarminSpo2Data error: ', err);
      responseCallback &&
        responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
    }
  }
}

function* takeEveryGarminSleepData() {
  yield takeEvery(getGarminSleepRangeDataRequest.type, garminRangeSleepData);
}

function* garminRangeSleepData({payload}) {
  const {payloadData, responseCallback} = payload;
  const {headers, params} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_GARMIN_SLEEP_DATA,
      {},
      '',
      {...headers},
      `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
      ApiSauce,
      GARMIN_BASE_URL,
    );

    console.log('garminRangeSleepData respppp =>>> ', response);

    if (response?.length) {
      responseCallback && responseCallback(true, {response, params});
    } else {
      responseCallback &&
        responseCallback(true, {params, response: GARMIN_SAMPLE_SLEEP});
    }
  } catch (err) {
    // console.log(JSON.stringify(err));
    console.warn('garminRangeSleepData error: ', err);
    responseCallback &&
      responseCallback(false, {params, response: GARMIN_SAMPLE_SLEEP});
  }
}

function* takeEveryGarminDailyData() {
  yield takeEvery(getGarminDailyRangeDataRequest.type, garminRangeDailyData);
}

function* garminRangeDailyData({payload}) {
  const {payloadData, responseCallback} = payload;
  const {headers, params} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_GARMIN_DAILY_DATA,
      {},
      '',
      {...headers},
      `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
      ApiSauce,
      GARMIN_BASE_URL,
    );

    console.log('garminRangeDailyData respppp =>>> ', response);

    if (response?.length) {
      responseCallback && responseCallback(true, {response, params});
    } else {
      responseCallback &&
        responseCallback(true, {params, response: GARMIN_SAMPLE_DAILY});
    }
  } catch (err) {
    // console.log(JSON.stringify(err));
    console.warn('garminRangeDailyData error: ', err);
    responseCallback && responseCallback(false, {params, response: {}});
  }
}

function* takeEveryGarminSpo2Data() {
  yield takeEvery(getGarminSpo2RangeDataRequest.type, garminRangeSpo2Data);
}

function* garminRangeSpo2Data({payload}) {
  const {payloadData, responseCallback} = payload;
  const {headers, params} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_GARMIN_SPO2_DATA,
      {},
      '',
      {...headers},
      `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
      ApiSauce,
      GARMIN_BASE_URL,
    );

    console.log('garminRangeSpo2Data respppp =>>> ', response);

    if (response?.length) {
      responseCallback && responseCallback(true, {response, params});
    } else {
      responseCallback &&
        responseCallback(true, {params, response: GARMIN_SAMPLE_SPO2});
    }
  } catch (err) {
    // console.log(JSON.stringify(err));
    console.warn('garminRangeSpo2Data error: ', err);
    responseCallback && responseCallback(false, {params, response: {}});
  }
}

function* takeEveryGarminBrData() {
  yield takeEvery(getGarminBrRangeDataRequest.type, garminRangeBrData);
}

function* garminRangeBrData({payload}) {
  const {payloadData, responseCallback} = payload;
  const {headers, params} = payloadData;

  try {
    const response = yield call(
      callRequest,
      GET_GARMIN_BR_DATA,
      {},
      '',
      {...headers},
      `uploadStartTimeInSeconds=${params?.uploadStartTimeInSeconds}&uploadEndTimeInSeconds=${params?.uploadEndTimeInSeconds}`,
      ApiSauce,
      GARMIN_BASE_URL,
    );

    console.log('garminRangeBrData respppp =>>> ', response);

    if (response?.length) {
      responseCallback && responseCallback(true, {response, params});
    } else {
      responseCallback &&
        responseCallback(true, {params, response: GARMIN_SAMPLE_BR});
    }
  } catch (err) {
    // console.log(JSON.stringify(err));
    console.warn('garminRangeBrData error: ', err);
    responseCallback && responseCallback(false, {params, response: {}});
  }
}

export default function* root() {
  yield fork(signup);
  yield fork(signin);
  yield fork(getOtp);
  yield fork(confirmOtp);
  yield fork(resetPassword);
  yield fork(changePassword);
  yield fork(updateProfile);
  yield fork(getUserData);
  yield fork(setUserFitBitData);
  yield fork(deleteUserFitBitData);
  yield fork(fitBitProfile);
  yield fork(fitBitSleepData);
  yield fork(fitBitSleepRangeData);
  yield fork(fitBitSleepGoalData);
  yield fork(fitBitGoalData);
  yield fork(fitBitSpO2Data);
  yield fork(fitBitActivityRangeData);
  yield fork(fitBitSpO2RangeData);
  yield fork(fitBitBrData);
  yield fork(fitBitBrRangeData);
  yield fork(getGarminUserInfo);
  yield fork(createGarminUser);
  yield fork(getGarminDailyData);
  yield fork(getGarminSleepData);
  yield fork(getGarminBrData);
  yield fork(getGarminSpo2Data);
  yield fork(deleteGarminUser);
  yield fork(getGarminUserPermissions);
  yield fork(takeEveryGarminSleepData);
  yield fork(takeEveryGarminDailyData);
  yield fork(takeEveryGarminSpo2Data);
  yield fork(takeEveryGarminBrData);
}

const sample = {
  garminData: {
    br: 15.16818181818182,
    calories: {calories_target: 2231, calories_value: 1731},
    sleep: {awake: 0, sleep_target: 1000, sleep_value: 0},
    spo2: NaN,
    steps: 4210,
    update: '2023-05-14T19:49:08.570Z',
    updated: null,
  },
};

import {Images} from '../theme';

// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 500;

// garmin keys

// date time formats
export const DATE_FORMAT1 = 'dddd, DD MMMM, YYYY';

// Messages

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  'Location permission required, please go to app settings to allow access';
export const INVALID_NAME_ERROR = 'Invalid name';
export const INVALID_EMAIL_ERROR = 'Invalid email';
export const INTERNET_ERROR = 'Please connect to the working internet';
export const SESSION_EXPIRED_ERROR = 'Session expired, Please login again';

// Message types
export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};
export const MONITOR_TYPE = {
  SLEEP: {
    monitorType: 'Sleep',
    measurement: 'hrs',
  },
  BREATHING_RATE: {
    monitorType: 'Breathing rate',
    measurement: 'bpm',
  },
  SPO2: {
    monitorType: 'SpO2',
    measurement: '%',
  },
  CALORIES: {
    monitorType: 'Calories',
    measurement: 'kcal',
  },
  STEPS: {
    monitorType: 'Steps',
    measurement: 'Steps',
  },
};

export const TEMP_KEYS = ['BREATHING_RATE', 'SPO2', 'CALORIES', 'STEPS'];
// File Types
export const FILE_TYPES = {VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi'};

export const strings = {
  NAME_SHOULD_NOT_CONTAIN_ONLY_SPACES:
    'Full Name should not contain only spaces in it.',
  PASSWORD_SHOULD_NOT_CONTAIN_ONLY_SPACES:
    'Password should not contain only spaces in it.',
  EMAIL_SHOULD_NOT_CONTAIN_ONLY_SPACES:
    'Email should not contain only spaces in it.',
  INVALID_USERNAME: 'Invalid Username.',
  REQUIRED_FIELD: '*Required Field',
  INVALID_EMAIL: 'Invalid Email',
  NEW_PASSWORD: 'New Password',
  CONFIRM_PASSWORD: 'Confrim Password',
  PASSWORD_MUST: 'Password should not be less than 6 characters',
  PASSWORD_AND_CONFIRM_PASS_SHOULD_BE_SAME:
    'New password and confirm password does not match.',
  EMAIL_AND_CONFIRM_EMAIL_SHOULD_BE_SAME:
    'Email and confirm email does not match.',
  PASSWORD_STRONGE:
    'Password should not be less than 8 characters and at least contain one alphabet, one digit and one special character in it.',
};

export const homeWithoutTabbar = [
  'notification',
  'monitorActivity',
  'connectWatch',
];
export const surveyWithoutTabbar = ['individualSurvey', 'monitorActivity'];
export const profileWithoutTabbar = ['editProfile', 'changePassword'];

export const ALERT_TYPES = {
  success: 'success',
  error: 'error',
};
export const fitBitConfig = {
  client_id: '23QS4V',
  client_secret: 'f3e11a9396fb45c767bfb6a2c8a3f161',
};

export const imagesArray = [
  {
    title: 'Worst',
    icon: Images.angryIcon,
    selectIcon: Images.selectedAngry,
  },
  {
    title: 'Poor',
    icon: Images.sadIcon,
    selectIcon: Images.selecteSad,
  },
  {
    title: 'Average',
    icon: Images.averageIcon,
    selectIcon: Images.selectedAverage,
  },
  {
    title: 'Good',
    icon: Images.goodIcon,
    selectIcon: Images.selectedGood,
  },
  {
    title: 'Excellent',
    icon: Images.unSelectedHappy,
    selectIcon: Images.happyIcon,
  },
];

export const FIT_BIT_SCOPES =
  'sleep profile oxygen_saturation activity respiratory_rate';

export const GARMIN_SAMPLE_DAILY = [
  {
    userId: '4aacafe82427c251df9c9592d0c06768',
    summaryId: 'x153a9f3-5a9478d4-6',
    calendarDate: '2022-01-11',
    activityType: 'WALKING',
    activeKilocalories: 321,
    bmrKilocalories: 1731,
    steps: 4210,
    pushes: 3088,
    distanceInMeters: 3146.5,
    pushDistanceInMeters: 2095.2,
    durationInSeconds: 86400,
    activeTimeInSeconds: 12240,
    startTimeInSeconds: 1452470400,
    startTimeOffsetInSeconds: 3600,
    moderateIntensityDurationInSeconds: 81870,
    vigorousIntensityDurationInSeconds: 4530,
    floorsClimbed: 8,
    minHeartRateInBeatsPerMinute: 59,
    maxHeartRateInBeatsPerMinute: 112,
    averageHeartRateInBeatsPerMinute: 64,
    restingHeartRateInBeatsPerMinute: 64,
    timeOffsetHeartRateSamples: {
      15: 75,
      30: 75,
      3180: 76,
      3195: 65,
      3210: 65,
      3225: 73,
      3240: 74,
      3255: 74,
    },
    source: 'string',
    stepsGoal: 4500,
    pushesGoal: 3100,
    intensityDurationGoalInSeconds: 1500,
    floorsClimbedGoal: 18,
    averageStressLevel: 43,
    maxStressLevel: 87,
    stressDurationInSeconds: 13620,
    restStressDurationInSeconds: 7600,
    activityStressDurationInSeconds: 3450,
    lowStressDurationInSeconds: 6700,
    mediumStressDurationInSeconds: 4350,
    highStressDurationInSeconds: 108000,
    stressQualifier: 'stressful_awake',
  },
];

export const GARMIN_SAMPLE_SLEEP = [
  {
    userId: '4aacafe82427c251df9c9592d0c06768',
    summaryId: 'x153a9f3-5a9478d4-6',
    calendarDate: '2022-01-10',
    durationInSeconds: 15264,
    startTimeInSeconds: 1452419581,
    startTimeOffsetInSeconds: 7200,
    unmeasurableSleepInSeconds: 0,
    deepSleepDurationInSeconds: 11231,
    lightSleepDurationInSeconds: 3541,
    remSleepInSeconds: 0,
    awakeDurationInSeconds: 492,
    sleepLevelsMap:
      'deep: [{startTimeInSeconds: 1452457493, endTimeInSeconds: 1452476939}], light: [{startTimeInSeconds: 1452478725, endTimeInSeconds: 1452479725}, {startTimeInSeconds: 1452481725, endTimeInSeconds: 1452484266}],rem: [{startTimeInSeconds: 1452476940, endTimeInSeconds: 1452479082}]',
    validation: 'DEVICE',
    timeOffsetSleepSpo2:
      '0: 95, 60: 96, 120: 97, 180: 93, 240: 94, 300: 95, 360: 96',
    timeOffsetSleepRespiration: '60: 15.31, 120: 14.58, 180: 12.73, 240: 12.87',
    overallSleepScore: {
      value: 87,
      qualifierKey: 'GOOD',
    },
    sleepScores: {
      additionalProp1: {
        value: 87,
        qualifierKey: 'GOOD',
      },
      additionalProp2: {
        value: 87,
        qualifierKey: 'GOOD',
      },
      additionalProp3: {
        value: 87,
        qualifierKey: 'GOOD',
      },
    },
  },
];

export const GARMIN_SAMPLE_BR = [
  {
    userId: '4aacafe82427c251df9c9592d0c06768',
    summaryId: 'x153a9f3-5a9478d4-6',
    startTimeInSeconds: 1568171700,
    durationInSeconds: 900,
    startTimeOffsetInSeconds: -18000,
    timeOffsetEpochToBreaths:
      '{0: 14.63, 60: 14.4, 120: 14.38, 180: 14.38, 300: 17.1, 540: 16.61, 600: 16.14, 660: 14.59, 720: 14.65, 780: 15.09, 840: 14.88}',
  },
];

export const GARMIN_SAMPLE_SPO2 = [
  {
    userId: '4aacafe82427c251df9c9592d0c06768',
    summaryId: 'x153a9f3-5a9478d4-6',
    calendarDate: '2022-08-27',
    startTimeInSeconds: 1535400706,
    durationInSeconds: 86400,
    startTimeOffsetInSeconds: 3600,
    timeOffsetSpo2Values:
      '{7140: 94, 10740: 98, 10800: 99, 10860: 98, 10920: 98, 10980: 97, 11040: 97, 11100: 98, 11160: 97, 11220: 96, 11280: 96, 11340: 97, 11400: 97, 11460: 96, 11520: 96, 75540: 95, 79140: 96, 82740: 97, 86340: 96}',
    onDemand: false,
  },
];

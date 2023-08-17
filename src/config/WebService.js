import _ from 'lodash';
import Util from '../util';

export const GARMIN = {
  REQUEST_TOKEN: 'oauth-service/oauth/request_token',
  OAUTH_CONFIRM: 'oauthConfirm?oauth_token=',
  ACCESS_TOKEN: 'oauth-service/oauth/access_token',
};

export const API_TIMEOUT = 30000;

// API USER ROUTES
export const API_LOG = false;

export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working internet',
  error: 'Please connect to the working internet',
};

export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// GARMIN APIS
export const GET_GARMIN_USER_INFO = {
  url: `${GARMIN_BASE_URL}/rest/user/id`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/user/id',
};

export const GET_GARMIN_USER_PERMISSIONS = {
  url: `${GARMIN_BASE_URL}/rest/user/permissions`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/user/permissions',
};

export const GET_GARMIN_DAILY_DATA = {
  url: `${GARMIN_BASE_URL}/rest/dailies`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/dailies',
  access_token_required: false,
};

export const GET_GARMIN_SLEEP_DATA = {
  url: `${GARMIN_BASE_URL}/rest/sleeps`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/sleeps',
  access_token_required: false,
};

export const GET_GARMIN_BR_DATA = {
  url: `${GARMIN_BASE_URL}/rest/respiration`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/respiration',
  access_token_required: false,
};

export const GET_GARMIN_SPO2_DATA = {
  url: `${GARMIN_BASE_URL}/rest/pulseOx`,
  method: REQUEST_TYPE.GET,
  data: {},
  type: REQUEST_TYPE.GET,
  route: '/rest/pulseOx',
  access_token_required: false,
};

export const CREATE_GARMIN_USER = {
  route: '/gramins',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_GARMIN_USER = {
  route: '/gramins',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

// API USER ROUTES

export const USER_SIGNIN = {
  route: '/auth/local',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_OTP_TOKEN = {
  route: '/getOtp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const CONFIRM_OTP = {
  route: '/confirm-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_SIGNUP = {
  route: '/auth/local/register',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const RESET_PASSWORD = {
  route: '/reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const CHANGE_PASSWORD = {
  route: 'auth/change-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPDATE_PROFILE = {
  route: 'update-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const UPLOAD_FILE = {
  route: '/upload',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_ALL_GROUPS = {
  route: '/groups',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const GET_USER_INFO = {
  route: '/users/me',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_SURVEYS = {
  route: '/get-user-survey',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const SUBMIT_SURVEY = {
  route: '/answers',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const SUBSCRIBE_SURVEY = {
  route: '/subscribe-surveys',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_COMPLETED_SURVEYS = {
  route: '/completed-surveys',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SET_USER_FITBIT = {
  route: '/fitbits',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const DELETE_USER_FITBIT = {
  route: '/fitbits',
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const TOKEN_NOTIFICATION = {
  route: '/update-token',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_NOTIFICATION = {
  route: '/notifications?populate=survey',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const UPDATE_NOTIFICATION = {
  route: '/notifications/:id',
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
//fitbit
export const GET_FITBIT_PROFILE = {
  route: '/1/user/-/profile.json',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_FITBIT_SLEEP_DATA = {
  route: '/1.2/user/-/sleep/date/[date].json',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_FITBIT_SPO_DATA = {
  route: '/1/user/-/spo2/date/[date].json',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_FITBIT_SPO_RANGE_DATA = {
  route: '/1/user/-/spo2/date/[start-date]/[end-date].json',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_FITBIT_SLEEP_RANGE_DATA = {
  route: '/1.2/user/-/sleep/date/[startDate]/[endDate].json',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_FITBIT_SLEEP_GOAL_DATA = {
  route: '/1.2/user/-/sleep/goal.json',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_FITBIT_GOAL_DATA = {
  route: '/1/user/-/activities/goals/daily.json',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_FITBIT_DAILY_ACTIVITY_DATA = {
  route: '/1/user/-/activities/date/[date].json',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_FITBIT_ACTIVITY_RANGE_DATA = {
  route:
    '/1/user/-/activities/[resource-path]/date/[start-date]/[end-date].json',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_FITBIT_BR_DATA = {
  route: '/1/user/-/br/date/[date].json',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const GET_FITBIT_BR_RANGE_DATA = {
  route: '/1/user/-/br/date/[start-date]/[end-date].json',
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const DELETE_DEVICE_TOKEN = {
  route: '/delete-token',
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_NOTIFICATION_COUNT = {
  route: '/get-notification-count/:userId',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const ClEAR_NOTIFICATION_COUNT = {
  route: '/clear-notification-count/:userId',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const COURT_NOTIFICATION_READ = {
  route: '/read-notification-count/:userId',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const callRequest = function (
  url,
  data,
  parameter,
  header = {},
  query,
  ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some problem, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token = Util.getCurrentUserAccessToken();

    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`,
        },
      };
    }
  }
  console.log('parameter =>> ', parameter);

  let _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}/${parameter}`
      : url.route;
  console.log('_url =>>> ', _url);
  if (query && query !== null) {
    _url = `${_url}?${query}`;
  }

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};

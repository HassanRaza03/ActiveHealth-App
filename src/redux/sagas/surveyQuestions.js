import _ from 'lodash';
import {take, fork, call, put} from 'redux-saga/effects';
import {
  createSubscribeSurveyRequest,
  findSubscribeSurveyRequest,
  getAllSurveysRequest,
  getAllSurveysSuccess,
  submitSurveyRequest,
  getAllCompletedSurveysRequest,
  getAllCompletedSurveysSuccess,
} from '../slicers/surveyQuestions';
import {
  GET_COMPLETED_SURVEYS,
  GET_SURVEYS,
  SUBMIT_SURVEY,
  SUBSCRIBE_SURVEY,
  callRequest,
} from '../../config/WebService';
import ApiSauce from '../../services/ApiSauce';
import {getSurveysManipulator} from '../../manipulators/survey';

function* getSurveys() {
  while (true) {
    const {payload} = yield take(getAllSurveysRequest.type);
    const {payloadData, responseCallback} = payload;

    let groupIds = '';

    if (payloadData?.groupIds?.length > 0) {
      groupIds += payloadData?.groupIds?.join(',');
    }

    try {
      const response = yield call(
        callRequest,
        GET_SURVEYS,
        {},
        '',
        {},
        `groupIds=${groupIds}&userId=${payloadData?.userId}`,
        ApiSauce,
      );

      console.log('all surveys --->>>>', response);

      if (response?.data) {
        responseCallback && responseCallback(true);
        yield put(getAllSurveysSuccess(getSurveysManipulator(response?.data)));
      } else {
        responseCallback(true);
      }
    } catch (err) {
      console.error(err);
      responseCallback(false);
    }
  }
}

function* submitSurvey() {
  while (true) {
    const {payload} = yield take(submitSurveyRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        SUBMIT_SURVEY,
        payloadData,
        '',
        {},
        ``,
        ApiSauce,
      );

      if (response?.data) {
        responseCallback && responseCallback(true);
        // yield put(getAllSurveysSuccess(getSurveysManipulator(response?.data)));
      } else {
        responseCallback && responseCallback(false);
      }
    } catch (err) {
      console.error(err);
      responseCallback && responseCallback(true);
    }
  }
}

function* findSubscribeSurvey() {
  while (true) {
    const {payload} = yield take(findSubscribeSurveyRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        SUBSCRIBE_SURVEY,
        {},
        '',
        {},
        `filters[survey][id][$eq]=${payloadData?.surveyId}&filters[user][id][$eq]=${payloadData?.userId}`,
        ApiSauce,
      );

      if (response?.meta) {
        if (response?.data?.length > 0) {
          const subscriptionId = response?.data?.[0]?.id;

          responseCallback(true, subscriptionId);
        } else {
          responseCallback && responseCallback(true, null);
        }
        // yield put(getAllSurveysSuccess(getSurveysManipulator(response?.data)));
      }
    } catch (err) {
      console.error(err);
      responseCallback && responseCallback(false, null);
    }
  }
}
function* getSubmittedSurveys() {
  while (true) {
    const {payload} = yield take(getAllCompletedSurveysRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_COMPLETED_SURVEYS,
        {},
        '',
        {},
        `userId=${payloadData?.userId}`,
        ApiSauce,
      );
      // console.log(
      //   'getAllCompletedSurveysResp  => ',
      //   JSON.stringify(response.data),
      // );

      if (response?.data) {
        responseCallback && responseCallback(true);
        yield put(getAllCompletedSurveysSuccess(response?.data));
      } else {
        responseCallback && responseCallback(true, null);
      }
      // yield put(getAllSurveysSuccess(getSurveysManipulator(response?.data)));
    } catch (err) {
      console.error(err);
      responseCallback && responseCallback(false, null);
    }
  }
}

// createSubscribeSurveyRequest

function* createSubscribeSurvey() {
  while (true) {
    const {payload} = yield take(createSubscribeSurveyRequest.type);
    const {payloadData, responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        {...SUBSCRIBE_SURVEY, type: 'post'},
        payloadData,
        '',
        {},
        '',
        ApiSauce,
      );

      if (response?.data) {
        // yield put(getAllSurveysSuccess(getSurveysManipulator(response?.data)));
        responseCallback && responseCallback(true, response?.data);
      } else {
        responseCallback && responseCallback(false, null);
      }
    } catch (err) {
      console.error(err);
      responseCallback && responseCallback(false, null);
    }
  }
}

export default function* root() {
  yield fork(getSurveys);
  yield fork(submitSurvey);
  yield fork(findSubscribeSurvey);
  yield fork(createSubscribeSurvey);
  yield fork(getSubmittedSurveys);
}

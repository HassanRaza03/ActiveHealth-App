import _ from 'lodash';
import {take, fork, call, put} from 'redux-saga/effects';
import {
  ERROR_SOMETHING_WENT_WRONG,
  GET_ALL_GROUPS,
  GET_USER_INFO,
  callRequest,
} from '../../config/WebService';
import ApiSauce from '../../services/ApiSauce';
import {
  getAllGroupsRequest,
  getAllGroupsSuccess,
  getUserGroupsRequest,
  getUserGroupsSuccess,
} from '../slicers/groups';
import {
  getAllGroupsManipulator,
  getUserGroupsManipulator,
} from '../../manipulators/groups';

function* getAllGroups() {
  while (true) {
    const {payload} = yield take(getAllGroupsRequest.type);
    const {responseCallback} = payload;

    try {
      const response = yield call(
        callRequest,
        GET_ALL_GROUPS,
        {},
        '',
        {},
        'populate=*&pagination[page]=1&pagination[pageSize]=500000',
        ApiSauce,
      );

      if (response?.data) {
        // yield put(updateProfileSuccess(payloadData));
        yield put(getAllGroupsSuccess(getAllGroupsManipulator(response?.data)));
        responseCallback && responseCallback(true);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('getAllGroups error: ', err);
    }
  }
}

function* getUserGroups() {
  while (true) {
    const {payload} = yield take(getUserGroupsRequest.type);
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
        yield put(
          getUserGroupsSuccess(getUserGroupsManipulator(response?.groups)),
        );
        responseCallback && responseCallback(true);
      } else {
        responseCallback &&
          responseCallback(false, ERROR_SOMETHING_WENT_WRONG.error);
      }
    } catch (err) {
      console.warn('getUserGroups error: ', err);
    }
  }
}

export default function* root() {
  yield fork(getAllGroups);
  yield fork(getUserGroups);
}

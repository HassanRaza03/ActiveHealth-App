import {fork} from 'redux-saga/effects';
import user from './user';
import general from './general';
import groups from './groups';
import surveyQuestions from './surveyQuestions';

export default function* root() {
  yield fork(user);
  yield fork(general);
  yield fork(groups);
  yield fork(surveyQuestions);
}

import {combineReducers} from '@reduxjs/toolkit';

import user from './user';
import selectors from './selectors';
import gerenal from './gerenal';
import surveyQuestions from './surveyQuestions';
import groups from './groups';

export default combineReducers({
  selectors,
  user,
  gerenal,
  surveyQuestions,
  groups,
});

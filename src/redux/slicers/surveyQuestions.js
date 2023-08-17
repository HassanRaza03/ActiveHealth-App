import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
const SurveyQuestionsReducer = createSlice({
  name: 'surveyQuestions',
  initialState: {
    questions: [],
    completedSurveys: [],
  },
  reducers: {
    getQuestions(state, action) {
      state.questions = action.payload;
    },

    getAllSurveysRequest() {},
    getAllSurveysSuccess(state, action) {
      state.questions = action?.payload;
    },
    getAllCompletedSurveysRequest() {},
    getAllCompletedSurveysSuccess(state, action) {
      state.completedSurveys = action?.payload;
    },

    submitSurveyRequest() {},
    submitSurveySuccess() {},

    findSubscribeSurveyRequest() {},
    findSubscribeSurveySuccess() {},

    createSubscribeSurveyRequest() {},
    removeAllQuestions(state) {
      state.questions = [];
    },

    surveyLogout(state) {
      state.questions = [];
      state.completedSurveys = [];
    },
  },
});

export const {
  getQuestions,
  getAllSurveysRequest,
  getAllSurveysSuccess,

  //completed surveys

  getAllCompletedSurveysRequest,
  getAllCompletedSurveysSuccess,

  // Submit Survey,
  submitSurveyRequest,
  submitSurveySuccess,

  // find subscribeSurvey
  findSubscribeSurveyRequest,
  findSubscribeSurveySuccess,

  // create subscription
  createSubscribeSurveyRequest,
  removeAllQuestions,
  surveyLogout,
} = SurveyQuestionsReducer.actions;

export default SurveyQuestionsReducer.reducer;

// @flow
import {createSlice} from '@reduxjs/toolkit';
import Immutable from 'seamless-immutable';

const CommentsReducer = createSlice({
  name: 'selectors',
  initialState: Immutable({
    tempObject: {},
  }),
  reducers: {
    getSelected(state, action) {},
  },
});

export const {getSelected} = CommentsReducer.actions;

export default CommentsReducer.reducer;

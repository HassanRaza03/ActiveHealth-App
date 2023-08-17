// @flow
import {createSlice} from '@reduxjs/toolkit';

const GroupsReducer = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    userGroups: [],
  },
  reducers: {
    getAllGroupsRequest() {},
    getAllGroupsSuccess(state, action) {
      state.groups = action.payload;
    },

    getUserGroupsRequest() {},
    getUserGroupsSuccess(state, action) {
      state.userGroups = action.payload;
    },
    //logout
    groupLogout(state) {
      state.groups = [];
      state.userGroups = [];
    },
  },
});

export const {
  getAllGroupsRequest,
  getAllGroupsSuccess,
  getUserGroupsRequest,
  getUserGroupsSuccess,
  groupLogout,
} = GroupsReducer.actions;

export default GroupsReducer.reducer;

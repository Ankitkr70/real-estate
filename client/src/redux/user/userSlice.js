import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  serverError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state, actions) => {
      state.loading = true;
    },
    signInSuccess: (state, actions) => {
      state.loading = false;
      state.currentUser = actions.payload;
      state.serverError = null;
    },
    signInFailure: (state, actions) => {
      state.loading = false;
      state.serverError = actions.payload;
    },
    updateUserStart: (state, actions) => {
      state.loading = true;
    },
    updateUserSuccess: (state, actions) => {
      state.loading = false;
      state.currentUser = actions.payload;
      state.serverError = null;
    },
    updateUserFailure: (state, actions) => {
      state.loading = false;
      state.serverError = actions.payload;
    },
    deleteUserStart: (state, actions) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, actions) => {
      state.loading = false;
      state.currentUser = null;
      state.serverError = null;
    },
    deleteUserFailure: (state, actions) => {
      state.loading = false;
      state.serverError = actions.payload;
    },
    signOutStart: (state, actions) => {
      state.loading = true;
    },
    signOutSuccess: (state, actions) => {
      state.loading = false;
      state.currentUser = null;
      state.serverError = null;
    },
    signOutFailure: (state, actions) => {
      state.loading = false;
      state.serverError = actions.payload;
    },
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  signOutSuccess,
  signOutFailure,
  signOutStart,
} = userSlice.actions;
export default userSlice.reducer;

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
  },
});

export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateUserSuccess,
  updateUserFailure,
  updateUserStart,
} = userSlice.actions;
export default userSlice.reducer;

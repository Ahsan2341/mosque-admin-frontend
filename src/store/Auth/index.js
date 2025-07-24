import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    name: null,
    email: null,
    mosqueStatus: null,
    mosqueId: null,
    mosqueName: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.currentUser = action.payload.currentUser;
    },
    clearAllAuthData: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setAuthData, clearAllAuthData } = authSlice.actions;
export default authSlice.reducer;

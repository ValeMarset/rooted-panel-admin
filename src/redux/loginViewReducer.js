import { createSlice } from "@reduxjs/toolkit";

const loginViewSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    showLogin(state, action) {
      return (state = true);
    },

    hideLogin(state, action) {
      return (state = false);
    },
  },
});

export const { showLogin, hideLogin } = loginViewSlice.actions;

export default loginViewSlice.reducer;

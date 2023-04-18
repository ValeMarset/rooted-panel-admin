import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: null,
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout(state) {
      return null;
    },
    update(state, action) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, update } = adminSlice.actions;

export default adminSlice.reducer;

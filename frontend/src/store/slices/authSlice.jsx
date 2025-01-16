import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    guestLogin: (state) => {
      state.user = {
        id: "guest",
        email: "guest@example.com",
        name: "Guest User",
        isGuest: true,
      };
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, guestLogin } = authSlice.actions;
export default authSlice.reducer;

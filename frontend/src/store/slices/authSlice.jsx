import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
  // Remove token from initial state since we're using HTTP-only cookies
  // token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      return state;
    },
    // Remove setAuth action since we're not managing tokens in frontend
    guestLogin: (state) => {
      const guestUser = {
        id: "guest",
        email: "guest@example.com",
        name: "Guest User",
        isGuest: true,
      };
      state.user = guestUser;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(guestUser));
    },
  },
});

export const { login, logout, guestLogin } = authSlice.actions;
export default authSlice.reducer;

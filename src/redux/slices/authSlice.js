// store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profileImage: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.profile = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",profileImage: null,
      };
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { loginSuccess, logout, setProfile } = authSlice.actions;
export default authSlice.reducer;

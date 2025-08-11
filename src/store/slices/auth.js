import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth";

const initialState = {
  user: JSON.parse(localStorage.getItem("edupluse_user")) || null,
  redirectToLogin: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setRedirectToLogin: (state, action) => {
      state.redirectToLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getUserWithToken.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        localStorage.setItem("edupluse_user", JSON.stringify(payload));
      }
    );
    builder.addMatcher(
      authApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        const { updated } = payload;
        console.log(payload, "payload");
        state.user = updated;
        localStorage.setItem("edupluse_user", JSON.stringify(updated));
      }
    );
  },
});

export const { logout, setRedirectToLogin } = slice.actions;

export default slice.reducer;

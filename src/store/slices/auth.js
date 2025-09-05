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
      localStorage.clear(); // sab clear kar dega
      window.location.href = "/auth/login"; // ya window.location.reload();
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

        // Merge karo instead of overwrite
        state.user = {
          ...state.user,
          profile: {
            ...state.user?.profile,
            ...updated, // sirf updated fields replace hongi
          },
        };

        localStorage.setItem("edupluse_user", JSON.stringify(state.user));
      }
    );
  },
});

export const { logout, setRedirectToLogin } = slice.actions;

export default slice.reducer;

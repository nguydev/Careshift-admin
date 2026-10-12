import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: Cookies.get("token") || null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogData: (state, action) => {
      const { user, token, remember } = action.payload;
      state.user = user;
      state.token = token;
      Cookies.set("token", token, {
        expires: remember ? 365 : undefined,
        // secure: false,
        sameSite: "strict",
      });
    },
    setUserData: (state, action) => {
      console.log(action.payload);
      const { user } = action.payload;
      state.user = user;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
    },
  },
});
export const { setLogData, setUserData, logOut } = loginSlice.actions;
export default loginSlice.reducer;

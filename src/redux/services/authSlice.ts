import { createSlice } from "@reduxjs/toolkit";
import LocalStorage from "../../helpers/LocalStorage";
import { IUser } from "../../types";
import { PURGE } from "redux-persist";

interface IState {
  profile?: IUser | null;
  token?: string | null;
}

const initialState: IState = {
  profile: undefined,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken(state, action) {
      state.token = action.payload;
      LocalStorage.setAccessToken(action.payload);
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
    set(state, action) {
      state.token = action.payload.token;
      state.profile = action.payload.user;
      // For testing
      // state.profile = {
      //   ...action.payload.user,
      //   roles: [...action.payload.user.roles, "sales_admin"],
      // };
      //LocalStorage.setAccessToken(action.payload.token);
    },

    logOut() {
      //LocalStorage.clear();
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { saveToken, logOut, setProfile, set } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { IUser, IUserMetricData } from "../../types";
import { PURGE } from "redux-persist";

interface IState {
  metric: IUserMetricData | null | undefined;
  selectedUser: IUser | null | undefined;
}

const initialState: IState = {
  metric: undefined,
  selectedUser: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserMetric(state, action) {
      state.metric = action.payload;
    },
    setUserForInvite(state, action) {
      state.selectedUser = action.payload;
    },
    setActiveUser(state, action) {
      state.selectedUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setUserMetric, setActiveUser, setUserForInvite } =
  userSlice.actions;
export default userSlice.reducer;

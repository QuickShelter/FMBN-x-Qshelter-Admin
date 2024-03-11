import { createSlice } from "@reduxjs/toolkit";
import { IRequestsMetricData } from "../../types";
import { PURGE } from "redux-persist";

interface IState {
  metric: IRequestsMetricData | null | undefined
}

const initialState: IState = {
  metric: undefined,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setRequestMetric(state, action) {
      state.metric = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { setRequestMetric } = requestSlice.actions;
export default requestSlice.reducer;

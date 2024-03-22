import { IToastSliceState, IToastState } from "@/types";
// https://redux-toolkit.js.org/usage/usage-guide
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const DURATION = 3000

const initialState: IToastSliceState = []

export const setToast = createAsyncThunk(
  "toast/setToast",
  async (payload: Omit<IToastState, "show">, { dispatch }) => {
    const newToast: IToastState = {
      duration: payload.duration,
      message: payload.message,
      type: payload.type,
      show: true,
    }

    dispatch(push(newToast));

    const timeout = setTimeout(() => {
      dispatch(pop());
    }, DURATION);

    return () => {
      clearTimeout(timeout);
    };
  }
);

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    set(state, { payload }: { payload: IToastSliceState }) {
      state = payload
    },

    push(state, { payload }: { payload: IToastState }) {
      state.push(payload)
      //state.push({ ...payload, message: `${payload.message}/${state.length}` })
    },

    pop(state) {
      state.shift()
    },

    clear(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setToast.pending, () => { })
      .addCase(setToast.fulfilled, () => { })
      .addCase(setToast.rejected, () => { });
  },
});

export const { push, set, clear, pop } = toastSlice.actions;
export default toastSlice.reducer;

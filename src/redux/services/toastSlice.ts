import { IToastSliceState, IToastState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: IToastSliceState = {
  duration: 3000,
  toasts: []
};

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
    }, payload.duration ?? initialState.duration);

    return () => {
      clearTimeout(timeout);
    };
  }
);

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    set(_, { payload }: { payload: IToastSliceState }) {
      return payload
    },

    push(state, { payload }: { payload: IToastState }) {
      const newToast: IToastState = {
        duration: payload.duration,
        message: payload.message,
        type: payload.type,
        show: true,
      }

      const toasts = state.toasts
      state.toasts.push(newToast)

      const newState: IToastSliceState = {
        duration: state.duration,
        toasts,
      }

      state = newState
    },

    pop(state) {
      state.toasts.shift()
    },

    clear() {
      return initialState;
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

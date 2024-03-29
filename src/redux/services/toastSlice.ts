import { IToastSliceState, IToastState } from "@/types";
// https://redux-toolkit.js.org/usage/usage-guide
import { ThunkAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const DURATION = 3000

const initialState: IToastSliceState = []

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    set(_, { payload }: { payload: IToastSliceState }) {
      return payload
    },

    push(state, { payload }: { payload: IToastState }) {
      state.push(payload)
    },

    pop(state) {
      state.shift()
    },

    remove(state, { payload: id }) {
      state.filter(toast => toast.id != id)
    },

    clear() {
      return initialState;
    },
  },
});

export const setToast = (payload: IToastState): ThunkAction<void, RootState, unknown, any> => (
  dispatch
) => {
  const newToast: IToastState = {
    duration: payload.duration ?? DURATION,
    message: payload.message,
    type: payload.type,
    show: true,
  };

  dispatch(push(newToast))

  const timeout = setTimeout(() => {
    dispatch(pop())
  }, DURATION);

  // Return a cleanup function
  return () => {
    clearTimeout(timeout);
  };
};

export const { push, set, clear, pop, remove } = toastSlice.actions;
export default toastSlice.reducer;

import { IToastSliceState, IToastState } from "@/types";
// https://redux-toolkit.js.org/usage/usage-guide
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { enqueueSnackbar } from "notistack";

const DURATION = 3000

const initialState: IToastSliceState = []

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    set(_, { payload }: { payload: IToastSliceState }) {
      // payload.forEach(element => {
      //   enqueueSnackbar(element.message, {
      //     variant: element.type
      //   })
      // });
      return payload
    },

    push(state, { payload }: { payload: IToastState }) {
      //return [payload]
      state.push(payload)
      //state.push({ ...payload, message: `${payload.message}/${state.length}` })
    },

    //queue(_, { payload }: { payload: IToastState }) {
    //return [payload]
    //state.push(payload)
    // enqueueSnackbar(payload.message)
    //state.push({ ...payload, message: `${payload.message}/${state.length}` })
    //},

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

export const setToast = createAsyncThunk(
  "toast/setToast",
  async (payload: Omit<IToastState, "show">, { dispatch }) => {
    const newToast: IToastState = {
      duration: payload.duration ?? DURATION,
      message: payload.message,
      type: payload.type,
      show: true,
    };
    dispatch(push(newToast));

    const timeout = setTimeout(() => {
      dispatch(pop());

      return () => {
        clearTimeout(timeout);
      };
    }, payload.duration ?? DURATION);
  }
);

// export const setToast = (payload: IToastState): ThunkAction<void, RootState, unknown, any> => (
//   dispatch
// ) => {
//   const newToast: IToastState = {
//     duration: payload.duration ?? DURATION,
//     message: payload.message,
//     type: payload.type,
//     show: true,
//   };

//   dispatch(push(newToast))

//   const timeout = setTimeout(() => {
//     //dispatch(remove(id))
//     dispatch(pop())
//   }, DURATION);

//   // Return a cleanup function
//   return () => {
//     clearTimeout(timeout);
//   };
// };

// export const setToast = (payload: IToastState) => {
//   enqueueSnackbar(payload.message, {
//     //variant: payload.type
//     variant: payload.type
//   })
// }

export const { push, set, clear, pop, remove } = toastSlice.actions;
export default toastSlice.reducer;

// https://redux-toolkit.js.org/rtk-query/usage/error-handling#handling-errors-at-a-macro-level
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { clear, set } from "../services/toastSlice";
import { persistor } from "../store";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    const { dispatch } = api;

    try {
      // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
      if (isRejectedWithValue(action)) {
        console.log(action.payload);

        if (action.payload.data.message === 'Forbidden') {
          dispatch(
            set({
              duration: 3000,
              toasts: [{
                message: "Session Expired",
                type: 'error',
                show: true
              }]
            })
          )

          const timeout = setTimeout(() => {
            dispatch(clear());

            return () => {
              clearTimeout(timeout);
            };
          }, 2000);

          persistor.purge();
        }

        //console.warn({ "Middleware caught": action });
        if (action.payload.status == "FETCH_ERROR") {
          dispatch(
            set({
              duration: 3000,
              toasts: [{
                message: "Session Expired",
                type: 'error',
                show: true
              }]
            })
          )


          console.log({ "Logged Error": action.payload });

          const timeout = setTimeout(() => {
            dispatch(clear());

            return () => {
              clearTimeout(timeout);
            };
          }, 2000);
        }
        //toast.warn({ title: "Async error!", message: action.error.data.message });
        const error = new Error("Error while fetching data.");
        throw error;
      }
    } catch (error) {
      // Report the error to Sentry
      // Sentry.captureException(error, {
      //   extra: {
      //     action,
      //   },
      // });
    }

    return next(action);
  };

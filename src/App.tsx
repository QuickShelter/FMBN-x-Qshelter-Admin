// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RouterProvider } from "react-router-dom";
import Router from "./modules/route/Router";
import { useState } from "react";
import { IToastState } from "./types";
import { ToastContext } from "./context/ToastContext_";

const DURATION = 3000

function App() {
  const [toasts, setToasts] = useState<IToastState[]>([])
  const popToast = () => {
    setToasts(prev => {
      const _toasts = [...prev]
      _toasts?.shift()
      return _toasts
    })
  }
  const pushToast = (toast: IToastState) => {
    setToasts(prev => {
      const _toasts = [...prev]
      _toasts?.push({ ...toast, show: true })
      return _toasts
    })

    setTimeout(() => {
      popToast()
    }, toast.duration ?? DURATION);
  }

  return (
    <Provider store={store}>
      <ToastContext.Provider value={
        {
          toasts,
          popToast,
          pushToast
        }
      }>
        <RouterProvider router={Router} />
      </ToastContext.Provider>
    </Provider>
  );
}

export default App;

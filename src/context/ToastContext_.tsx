import { IToastState } from "@/types";
import { createContext, useContext } from "react";

export const ToastContext = createContext<{
  pushToast: (toast: IToastState) => void,
  popToast: () => void,
  toasts: IToastState[]
}>({
  pushToast: () => { },
  popToast: () => { },
  toasts: []
});

export const useToastContext = () => useContext(ToastContext)
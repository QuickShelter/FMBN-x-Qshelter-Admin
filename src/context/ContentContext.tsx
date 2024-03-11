import { createContext, RefObject } from "react";

export const ContentRefContext = createContext<
  RefObject<HTMLDivElement> | undefined
>(undefined);

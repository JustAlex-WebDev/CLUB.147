import CursorContextProvider from "./CursorContext";
import { ReactNode } from "react";

export const ContextProviders = ({ children }: { children: ReactNode }) => (
  <CursorContextProvider>{children}</CursorContextProvider>
);

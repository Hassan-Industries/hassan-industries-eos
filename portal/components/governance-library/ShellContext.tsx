"use client";

import { createContext, useContext, type ReactNode } from "react";

const ShellContext = createContext(false);

export function ShellProvider({ children }: { children: ReactNode }) {
  return <ShellContext.Provider value={true}>{children}</ShellContext.Provider>;
}

export function useShellActive() {
  return useContext(ShellContext);
}

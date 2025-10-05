"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type SnackBarType = "success" | "error";

interface SnackBarData {
  message: string;
  type: SnackBarType;
}

interface SnackBarContextState {
  isOpen: boolean;
  data: SnackBarData;
  openSnackBar: (message: string, type: SnackBarType) => void;
  closeSnackBar: () => void;
}

const SnackBarContext = createContext<SnackBarContextState | undefined>(undefined);

export const SnackBarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<SnackBarData>({ message: "", type: "error" });

  const openSnackBar = (message: string, type: SnackBarType) => {
    setData({ message, type });
    setIsOpen(true);
  };

  const closeSnackBar = () => {
    setIsOpen(false);
    setData({ message: "", type: "error" });
  };

  return (
    <SnackBarContext.Provider value={{ isOpen, data, openSnackBar, closeSnackBar }}>
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = (): SnackBarContextState => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useSnackBar must be used within a SnackBarProvider");
  }
  return context;
};

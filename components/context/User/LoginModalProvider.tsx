"use client";

import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { createContext, useContext, useState } from "react";
import { LoginModal } from "../../auth/LoginModal";

interface LoginModalProviderState {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: LoginModalProviderState = {
  isOpen: false,
  setOpen: () => {},
};

export const LoginModalContext =
  createContext<LoginModalProviderState>(initialState);

export const LoginModalProvider: React.FC<ChildNodeProps> = ({ children }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <LoginModalContext.Provider value={{ isOpen, setOpen }}>
      <LoginModal />
      {children}
    </LoginModalContext.Provider>
  );
};

export const UseLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error("useLoginModal must be used within a LoginModalProvider");
  }
  return context;
};

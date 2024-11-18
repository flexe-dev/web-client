"use client";

import { LoginModal } from "@/components/auth/LoginModal";
import { ChildNodeProps } from "@/lib/interfaces/componentTypes";
import { createContext, useContext, useState } from "react";
import { loginModalInitialState, LoginModalProviderState } from "./LoginModalState";



export const LoginModalContext =
  createContext<LoginModalProviderState>(loginModalInitialState);

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

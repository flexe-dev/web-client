"use client";

import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Define the initial state of the context
// Create the context
export const AccountContext = createContext<User | undefined>(undefined);

// Create the provider component
interface Props {
  children: React.ReactNode;
}
export const AccountProvider = ({ children }: Props) => {
  // Define your state variables here
  const router = useRouter();
  const pathName = usePathname();
  const session = useSession();
  const user = useMemo(() => session.data?.user, []);
  // Add any methods or functions you need here
  useEffect(() => {
    if (!user) return;
    if (!user.onboarded && pathName !== "/auth/onboard") {
      router.push("/auth/onboard");
    }
  });

  // Provide the state and any methods/functions to the children components
  return (
    <AccountContext.Provider value={user}>{children}</AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = React.useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};

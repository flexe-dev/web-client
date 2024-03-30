"use client";

import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { createContext, useMemo } from "react";

interface AccountProviderState {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const initialState: AccountProviderState = {
  user: undefined,
  setUser: () => {},
};

export const AccountContext = createContext<AccountProviderState>(initialState);

interface Props {
  children: React.ReactNode;
}

export const AccountProvider = ({ children }: Props) => {
  const session = useSession();
  const [user, setUser] = React.useState<User | undefined>(
    session.data?.user as User
  );

  return (
    <AccountContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = React.useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
